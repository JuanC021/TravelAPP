<?php

use App\Http\Controllers\TravelController;

Route::get('/', [TravelController::class, 'index'])->name('showForm');
Route::post('/convert', [TravelController::class, 'convert'])->name('getTravelInfo');


