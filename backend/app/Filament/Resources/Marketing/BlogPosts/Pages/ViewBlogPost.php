<?php

namespace App\Filament\Resources\Marketing\BlogPosts\Pages;

use App\Filament\Resources\Marketing\BlogPosts\BlogPostResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewBlogPost extends ViewRecord
{
    protected static string $resource = BlogPostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
