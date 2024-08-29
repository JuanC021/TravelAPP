<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TravelController extends Controller
{
    public function index()
    {
        return view('travel');
    }

    public function convert(Request $request)
{
    $city = $request->input('city');
    $budget = $request->input('budget');

    //Clave de la API genereada por la pagina principal.
    $weatherApiKey = 'da789964a0648dc406a1978410cc41b7';

    // Monedas locales según la ciudad
    $currencies = [
        'London' => 'GBP',  // Libras Esterlinas
        'New York' => 'USD', // Dólar Estadounidense
        'Paris' => 'EUR',    // Euro
        'Tokyo' => 'JPY',    // Yen Japonés
        'Madrid' => 'EUR'    // Euro
    ];

    $currencySymbolMap = [
        'GBP' => '£',
        'USD' => '$',
        'EUR' => '€',
        'JPY' => '¥'
    ];

    // Obtener la moneda local de la ciudad seleccionada
    $localCurrency = $currencies[$city];
    $currencySymbol = $currencySymbolMap[$localCurrency];

    // Obtener datos del clima
    $weatherResponse = Http::get("http://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$weatherApiKey}&units=metric");
    $weatherData = $weatherResponse->json();

    // Obtener datos de conversión de moneda desde COP a la moneda local
    $currencyResponse = Http::get("https://api.exchangerate-api.com/v4/latest/COP");
    $currencyData = $currencyResponse->json();

    $exchangeRate = $currencyData['rates'][$localCurrency] ?? 1;
    $convertedBudget = $budget * $exchangeRate;

    return view('result', [
        'city' => $city,
        'weather' => $weatherData['main']['temp'],
        'currencyName' => $localCurrency,
        'currencySymbol' => $currencySymbol,
        'convertedBudget' => $convertedBudget,
        'exchangeRate' => $exchangeRate
    ]);
}


}
