<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\City;

class TravelController extends Controller
{
    public function index()
    {
        return view('travel');
    }
public function convert(Request $request)
{
    // Obtener el nombre de la ciudad y el presupuesto desde el formulario
    $cityName = $request->input('city');
    $budget = $request->input('budget');

    // Buscar la ciudad en la base de datos
    $city = City::where('name', $cityName)->first();

    if (!$city) {
        // Si la ciudad no se encuentra, mostrar un error
        return back()->withErrors(['city' => 'City not found']);
    }

    // Clave de la API de clima
    $weatherApiKey = 'da789964a0648dc406a1978410cc41b7';

    // Obtener datos del clima desde la API
    $weatherResponse = Http::get("http://api.openweathermap.org/data/2.5/weather?q={$cityName}&appid={$weatherApiKey}&units=metric");
    $weatherData = $weatherResponse->json();

    // Obtener datos de conversión de moneda desde COP a la moneda local usando la API
    $currencyResponse = Http::get("https://api.exchangerate-api.com/v4/latest/COP");
    $currencyData = $currencyResponse->json();

    // Obtener la tasa de cambio desde la API de conversión de moneda
    $exchangeRate = $currencyData['rates'][$city->currency] ?? 1;
    $convertedBudget = $budget * $exchangeRate;

    // Retornar los datos a la vista result.blade.php
    return view('result', [
        'city' => $cityName,
        'weather' => $weatherData['main']['temp'],
        'currencyName' => $city->currency,
        'currencySymbol' => $city->symbol,
        'convertedBudget' => $convertedBudget,
        'exchangeRate' => $exchangeRate
    ]);
}


// Método para obtener todas las ciudades
    public function getCities()
    {
        $cities = City::all(); // Obtiene todas las ciudades de la base de datos
        return response()->json(['cities' => $cities]);
    }

}
