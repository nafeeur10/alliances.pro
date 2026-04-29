<?php

namespace App\Http\Controllers\Api\Marketing;

use App\Http\Controllers\Api\Marketing\Concerns\CachesMarketingResponses;
use App\Http\Controllers\Controller;
use App\Http\Resources\Marketing\TestimonialResource;
use App\Models\Marketing\Testimonial;
use Illuminate\Http\JsonResponse;

class ListTestimonials extends Controller
{
    use CachesMarketingResponses;

    public function __invoke(): JsonResponse
    {
        return $this->cached('testimonials.index', fn (): array =>
            TestimonialResource::collection(Testimonial::published()->orderBy('order')->get())->resolve(),
        );
    }
}
