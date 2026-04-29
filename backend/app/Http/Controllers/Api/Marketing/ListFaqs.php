<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\FaqResource;
use App\Models\Marketing\Faq;
use Illuminate\Http\JsonResponse;

class ListFaqs extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(): JsonResponse
    {
        return $this->cached('faqs.index.grouped', function (): array {
            $faqs = Faq::published()->orderBy('category')->orderBy('order')->get();
            return $faqs
                ->groupBy(fn (Faq $faq): string => $faq->category ?? 'Other')
                ->map(fn ($group) => FaqResource::collection($group)->resolve())
                ->toArray();
        });
    }
}
