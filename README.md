# Trabajo Práctico - Principios SOLID en TypeScript

## Alumno

[Tu Nombre]

## Repositorio GitHub

Link del repositorio:

https://github.com/usuario/solid-typescript

---

# Problema 1 - Sistema de Envíos Todopoderoso

## Problemas detectados

La clase `OrderService` incumple:

### SRP (Single Responsibility Principle)

Tiene múltiples responsabilidades:

* Calcular costos de envío.
* Procesar pagos.
* Enviar notificaciones.

Si alguna de estas funcionalidades cambia, la clase debe modificarse.

### OCP (Open/Closed Principle)

Para agregar un nuevo método de envío o pago es necesario modificar la clase existente mediante nuevos `if`.

Esto genera alto acoplamiento y dificulta la escalabilidad.

---

## Solución propuesta

Se dividieron las responsabilidades en:

* ShippingMethod
* PaymentMethod
* NotificationService
* OrderService

Además se utilizaron interfaces para permitir nuevas implementaciones sin modificar el código existente.

### Beneficios

* Bajo acoplamiento.
* Mayor mantenibilidad.
* Fácil extensión.
* Código más reutilizable.

---

# Problema 2 - Procesador de Documentos Rebelde

## Problemas detectados

### ISP (Interface Segregation Principle)

La interfaz original obligaba a todas las clases a implementar:

* open()
* edit()
* save()

Sin embargo un PDF protegido no puede editarse ni guardarse.

### LSP (Liskov Substitution Principle)

Un objeto PDF no puede sustituir correctamente a un DocumentHandler porque lanza excepciones cuando se llaman métodos esperados por el cliente.

---

## Solución propuesta

Se dividió la interfaz en:

* Openable
* Editable
* Savable

Los documentos sólo implementan las capacidades que realmente poseen.

### Beneficios

* No existen métodos innecesarios.
* Se elimina la posibilidad de errores por operaciones no soportadas.
* Se cumple el principio de sustitución.

---

# Problema 3 - Interruptor Rígido

## Problemas detectados

### DIP (Dependency Inversion Principle)

La clase Switch depende directamente de:

TraditionalBulb

Esto provoca:

* Alto acoplamiento.
* Dificultad para reutilizar.
* Dificultad para agregar nuevos dispositivos.

---

## Solución propuesta

Se creó una abstracción:

SwitchableDevice

El interruptor recibe el dispositivo mediante Inyección de Dependencias.

### Beneficios

* Flexibilidad.
* Bajo acoplamiento.
* Fácil extensión.
* Mayor testabilidad.

---

# Conclusión

La aplicación de los principios SOLID permitió:

* Reducir dependencias innecesarias.
* Mejorar la escalabilidad.
* Facilitar el mantenimiento.
* Aumentar la reutilización del código.

Estos principios son fundamentales para el desarrollo de software orientado a objetos y ayudan a construir sistemas más robustos y extensibles.
