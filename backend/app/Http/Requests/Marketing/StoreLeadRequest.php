<?php

namespace App\Http\Requests\Marketing;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'source' => 'required|in:contact_form,demo_form,newsletter,waitlist',
            'name' => 'required_unless:source,newsletter|string|max:120',
            'email' => 'required|email:rfc|max:160',
            'company' => 'nullable|string|max:120',
            'team_size' => 'nullable|in:solo,2-10,11-50,51-200,200+',
            'message' => 'required_if:source,contact_form,demo_form|string|max:5000',
            'waitlist_for' => 'required_if:source,waitlist|in:education_crm,real_estate_crm,healthcare_crm',
            'consent_given' => 'accepted',
            'honeypot' => 'nullable|prohibited',
            'recaptcha_token' => 'required_if:source,contact_form,demo_form|string',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'source.required' => 'Please tell us how you found us.',
            'source.in' => 'That source isn\'t one we recognize.',
            'name.required_unless' => 'Please tell us your name.',
            'email.required' => 'We need an email to reply to you.',
            'email.email' => 'That email address doesn\'t look right.',
            'message.required_if' => 'Please add a short message so we know how to help.',
            'message.max' => 'Your message is a bit long — please keep it under 5,000 characters.',
            'waitlist_for.required_if' => 'Please pick which waitlist you\'d like to join.',
            'waitlist_for.in' => 'That waitlist isn\'t open yet.',
            'consent_given.accepted' => 'Please confirm you\'re OK with us emailing you back.',
            'honeypot.prohibited' => 'Submission flagged as spam.',
            'recaptcha_token.required_if' => 'Please complete the bot check before submitting.',
            'team_size.in' => 'Please pick one of the team-size options.',
        ];
    }

    /**
     * Strip the validated payload to columns we persist on the Lead model.
     *
     * @return array<string, mixed>
     */
    public function leadAttributes(): array
    {
        $validated = $this->validated();

        return [
            'name' => $validated['name'] ?? null,
            'email' => $validated['email'],
            'company' => $validated['company'] ?? null,
            'team_size' => $validated['team_size'] ?? null,
            'message' => $validated['message'] ?? null,
            'source' => $validated['source'],
            'waitlist_for' => $validated['waitlist_for'] ?? null,
            'consent_given' => true,
        ];
    }
}
