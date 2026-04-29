<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Controller;
use App\Http\Requests\Marketing\StoreLeadRequest;
use App\Jobs\Marketing\ProcessNewMarketingLead;
use App\Models\Marketing\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LeadController extends Controller
{
    public function __invoke(StoreLeadRequest $request): JsonResponse
    {
        $recaptchaCheck = $this->verifyRecaptcha($request);
        if ($recaptchaCheck !== null) {
            return $recaptchaCheck;
        }

        $attributes = $request->leadAttributes();

        $existing = Lead::query()
            ->where('email', $attributes['email'])
            ->where('source', $attributes['source'])
            ->where('created_at', '>=', Carbon::now()->subMinutes(60))
            ->first();

        if ($existing !== null) {
            return $this->formatResponse($existing, 200);
        }

        $lead = Lead::create($attributes + [
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 255),
        ]);

        ProcessNewMarketingLead::dispatch($lead->id);

        return $this->formatResponse($lead, 201);
    }

    protected function verifyRecaptcha(StoreLeadRequest $request): ?JsonResponse
    {
        $source = $request->validated('source');
        if (! in_array($source, ['contact_form', 'demo_form'], true)) {
            return null;
        }

        $secret = config('services.recaptcha.secret') ?: env('RECAPTCHA_SECRET');
        if (! $secret) {
            Log::warning('reCAPTCHA secret not configured; skipping verification.', ['source' => $source]);
            return null;
        }

        $token = (string) $request->validated('recaptcha_token');
        $response = Http::asForm()
            ->timeout(5)
            ->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => $secret,
                'response' => $token,
                'remoteip' => $request->ip(),
            ]);

        if (! $response->successful()) {
            Log::warning('reCAPTCHA verify request failed.', ['status' => $response->status()]);
            return response()->json([
                'message' => 'Could not verify the bot check. Please try again in a moment.',
            ], 422);
        }

        $data = $response->json();
        if (! ($data['success'] ?? false)) {
            return response()->json([
                'message' => 'Bot check failed. Please refresh and try again.',
            ], 422);
        }

        $score = (float) ($data['score'] ?? 0);
        if ($score < 0.5) {
            Log::info('reCAPTCHA score too low.', ['score' => $score, 'source' => $source]);
            return response()->json([
                'message' => 'Submission flagged as suspicious. Please contact us directly.',
            ], 422);
        }

        return null;
    }

    protected function formatResponse(Lead $lead, int $status): JsonResponse
    {
        return response()->json([
            'data' => [
                'id' => $lead->id,
                'source' => $lead->source,
                'received_at' => optional($lead->created_at)->toIso8601String(),
            ],
        ], $status);
    }
}
