
var app = angular.module('slotApp', []);

app.controller('SlotController', ['$scope', '$timeout', '$interval', function($scope, $timeout, $interval) {
    
    // 1. Configuración de los símbolos posibles
    var opciones = [
        { id: 1, nombre: 'Cereza',  icono: '🍒' },
        { id: 2, nombre: 'Limón',   icono: '🍋' },
        { id: 3, nombre: 'Campana', icono: '🔔' },
        { id: 4, nombre: 'Estrella',icono: '⭐' },
        { id: 5, nombre: 'Sandía',  icono: '🍉' }
    ];

    // 2. Estado inicial del juego
    // Inicializamos los 3 carretes con los primeros 3 símbolos
    $scope.carretes = [opciones[0], opciones[1], opciones[2]];
    
    // Variables de control de la interfaz
    $scope.girando = false;
    $scope.mensajeResultado = "¡Prueba tu suerte!";
    $scope.claseResultado = ""; // Para cambiar el color (verde, amarillo, rojo)

    // 3. Contador de estadísticas (Requisito 4)
    $scope.estadisticas = {
        ganadas: 0,
        casi: 0,
        perdidas: 0
    };

    // 4. Función principal: Girar (Requisito 2)
    $scope.girar = function() {
        if ($scope.girando) return; // Evita que den click mientras gira
        
        $scope.girando = true;
        $scope.mensajeResultado = "Girando..."; 
        $scope.claseResultado = "";

        // --- Animación (Bonus point) ---
        // Cambia las imágenes rápidamente cada 100ms para simular movimiento
        var animacion = $interval(function() {
            $scope.carretes = [
                opciones[Math.floor(Math.random() * opciones.length)],
                opciones[Math.floor(Math.random() * opciones.length)],
                opciones[Math.floor(Math.random() * opciones.length)]
            ];
        }, 100);

        // Detener la animación después de 1.5 segundos y mostrar resultado real
        $timeout(function() {
            $interval.cancel(animacion); // Detiene el efecto visual
            generarResultadoFinal();     // Calcula el resultado final
            $scope.girando = false;      // Reactiva el botón
        }, 1500);
    };

    // Función auxiliar para seleccionar los símbolos finales
    function generarResultadoFinal() {
        var c1 = opciones[Math.floor(Math.random() * opciones.length)];
        var c2 = opciones[Math.floor(Math.random() * opciones.length)];
        var c3 = opciones[Math.floor(Math.random() * opciones.length)];

        // Actualiza la vista con los símbolos finales
        $scope.carretes = [c1, c2, c3];

        // Llama a la evaluación
        evaluarGanador(c1, c2, c3);
    }

    // 5. Evaluar la combinación (Requisito 3)
    function evaluarGanador(r1, r2, r3) {
        // Caso: 3 iguales -> GANASTE
        if (r1.id === r2.id && r2.id === r3.id) {
            $scope.mensajeResultado = "¡GANASTE!";
            $scope.claseResultado = "msg-ganaste"; // Clase CSS verde
            $scope.estadisticas.ganadas++;
        } 
        // Caso: 2 iguales -> CASI
        else if (r1.id === r2.id || r1.id === r3.id || r2.id === r3.id) {
            $scope.mensajeResultado = "¡CASI!";
            $scope.claseResultado = "msg-casi"; // Clase CSS amarilla
            $scope.estadisticas.casi++;
        } 
        // Caso: Todas diferentes -> PERDISTE
        else {
            $scope.mensajeResultado = "PERDISTE";
            $scope.claseResultado = "msg-perdiste"; // Clase CSS roja
            $scope.estadisticas.perdidas++;
        }
    }

}]);