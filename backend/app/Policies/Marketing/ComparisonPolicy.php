<?php

declare(strict_types=1);

namespace App\Policies\Marketing;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\Marketing\Comparison;
use Illuminate\Auth\Access\HandlesAuthorization;

class ComparisonPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:Comparison');
    }

    public function view(AuthUser $authUser, Comparison $comparison): bool
    {
        return $authUser->can('View:Comparison');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:Comparison');
    }

    public function update(AuthUser $authUser, Comparison $comparison): bool
    {
        return $authUser->can('Update:Comparison');
    }

    public function delete(AuthUser $authUser, Comparison $comparison): bool
    {
        return $authUser->can('Delete:Comparison');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny:Comparison');
    }

    public function restore(AuthUser $authUser, Comparison $comparison): bool
    {
        return $authUser->can('Restore:Comparison');
    }

    public function forceDelete(AuthUser $authUser, Comparison $comparison): bool
    {
        return $authUser->can('ForceDelete:Comparison');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:Comparison');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:Comparison');
    }

    public function replicate(AuthUser $authUser, Comparison $comparison): bool
    {
        return $authUser->can('Replicate:Comparison');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:Comparison');
    }

}