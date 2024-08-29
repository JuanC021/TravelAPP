<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados del Viaje</title>
</head>
<body>
    <h1>Información de tu Viaje</h1>

    <p><strong>Ciudad:</strong> {{ $city }}</p>
    <p><strong>Clima Actual:</strong> {{ $weather }} °C</p>
    <p><strong>Moneda Local:</strong> {{ $currencyName }} ({{ $currencySymbol }})</p>
    <p><strong>Presupuesto en Moneda Local:</strong> {{ $convertedBudget }} {{ $currencySymbol }}</p>
    <p><strong>Tasa de Cambio:</strong> {{ $exchangeRate }}</p>

    <a href="{{ route('showForm') }}">Volver</a>
</body>
</html>
