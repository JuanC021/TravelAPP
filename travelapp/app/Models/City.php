<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $table = 'cities'; 

    protected $fillable = ['name', 'currency', 'symbol', 'exchange_rate']; // Campos que se pueden llenar masivamente
}
