<?php
/**
 * Created by PhpStorm.
 * User: josephdalughut
 * Date: 4/15/18
 * Time: 9:09 PM
 */
namespace App\Scopes;

class EnabledScope implements \Illuminate\Database\Eloquent\Scope
{
    public function apply(\Illuminate\Database\Eloquent\Builder $builder, \Illuminate\Database\Eloquent\Model $model)
    {
        $builder->where('enabled', true);
    }

}