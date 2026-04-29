<?php

declare(strict_types=1);

namespace App\Policies\Marketing;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\Marketing\Integration;
use Illuminate\Auth\Access\HandlesAuthorization;

class IntegrationPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:Integration');
    }

    public function view(AuthUser $authUser, Integration $integration): bool
    {
        return $authUser->can('View:Integration');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:Integration');
    }

    public function update(AuthUser $authUser, Integration $integration): bool
    {
        return $authUser->can('Update:Integration');
    }

    public function delete(AuthUser $authUser, Integration $integration): bool
    {
        return $authUser->can('Delete:Integration');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny:Integration');
    }

    public function restore(AuthUser $authUser, Integration $integration): bool
    {
        return $authUser->can('Restore:Integration');
    }

    public function forceDelete(AuthUser $authUser, Integration $integration): bool
    {
        return $authUser->can('ForceDelete:Integration');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:Integration');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:Integration');
    }

    public function replicate(AuthUser $authUser, Integration $integration): bool
    {
        return $authUser->can('Replicate:Integration');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:Integration');
    }

}