<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

     // Se especifica la tabla en la base de datos que está relacionada con este modelo.
    protected $table = 'cities'; 

    // Se define qué campos de la tabla se pueden llenar de forma masiva.
    protected $fillable = ['name', 'currency', 'symbol', 'exchange_rate']; 
}
