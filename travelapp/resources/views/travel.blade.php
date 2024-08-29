<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TravelApp</title>
</head>
<body>
    <h1>Planifica tu Viaje</h1>

    <form action="{{ route('getTravelInfo') }}" method="POST">
        @csrf

        <label for="city">Selecciona una ciudad:</label>
        <select name="city" id="city" required>
            <option value="London">Londres</option>
            <option value="New York">Nueva York</option>
            <option value="Paris">París</option>
            <option value="Tokyo">Tokio</option>
            <option value="Madrid">Madrid</option>
        </select>

        <br>

        <label for="budget">Ingresa tu presupuesto en pesos colombianos:</label>
        <input type="number" name="budget" id="budget" required>

        <br>

        <button type="submit">Obtener Información</button>
    </form>
</body>
</html>
