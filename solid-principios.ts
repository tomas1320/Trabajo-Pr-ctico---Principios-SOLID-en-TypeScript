// SOLID en TypeScript
// Este archivo contiene ejemplos corregidos de los principios SRP, OCP, LSP, ISP y DIP.

// 1. SRP - Principio de Responsabilidad Única
class Usuario {
  constructor(public nombre: string, public email: string) {}

  validarEmail(): boolean {
    return this.email.includes("@");
  }
}

class UsuarioRepositorio {
  guardar(usuario: Usuario): void {
    console.log(`Guardando ${usuario.nombre} en BD`);
  }

  cargar(id: string): Usuario | null {
    // Lógica para cargar usuario desde una fuente de datos
    return null;
  }
}

class EmailService {
  enviarEmail(usuario: Usuario, mensaje: string): void {
    console.log(`Enviando email a ${usuario.email}: ${mensaje}`);
  }
}

const usuarioSRP = new Usuario("Juan", "juan@email.com");
const repositorio = new UsuarioRepositorio();
const emailService = new EmailService();
repositorio.guardar(usuarioSRP);
emailService.enviarEmail(usuarioSRP, "Bienvenido!");
console.log(`Email válido: ${usuarioSRP.validarEmail()}`);

// 2. OCP - Principio Abierto/Cerrado
interface IForma {
  calcularArea(): number;
}

class Circulo implements IForma {
  constructor(private radio: number) {}

  calcularArea(): number {
    return Math.PI * this.radio ** 2;
  }
}

class Rectangulo implements IForma {
  constructor(private ancho: number, private alto: number) {}

  calcularArea(): number {
    return this.ancho * this.alto;
  }
}

class Triangulo implements IForma {
  constructor(private base: number, private altura: number) {}

  calcularArea(): number {
    return (this.base * this.altura) / 2;
  }
}

class CalculadoraArea {
  calcularAreaTotal(formas: IForma[]): number {
    return formas.reduce((total, forma) => total + forma.calcularArea(), 0);
  }
}

const formas: IForma[] = [new Circulo(5), new Rectangulo(4, 6), new Triangulo(3, 8)];
const calculadora = new CalculadoraArea();
console.log(`Área total OCP: ${calculadora.calcularAreaTotal(formas)}`);

// 3. LSP - Principio de Sustitución de Liskov
interface IFormaCalculable {
  calcularArea(): number;
}

class RectanguloLSP implements IFormaCalculable {
  constructor(private ancho: number, private alto: number) {}

  calcularArea(): number {
    return this.ancho * this.alto;
  }
}

class Cuadrado implements IFormaCalculable {
  constructor(private lado: number) {}

  calcularArea(): number {
    return this.lado ** 2;
  }
}

function calcularAreaTotal(formas: IFormaCalculable[]): number {
  return formas.reduce((total, forma) => total + forma.calcularArea(), 0);
}

const formasLSP: IFormaCalculable[] = [new RectanguloLSP(5, 4), new Cuadrado(3)];
console.log(`Área total LSP: ${calcularAreaTotal(formasLSP)}`);

// 4. ISP - Principio de Segregación de Interfaces
interface ITrabajador {
  trabajar(): void;
}

interface IComedor {
  comer(): void;
}

interface IDurmiente {
  dormir(): void;
}

class Humano implements ITrabajador, IComedor, IDurmiente {
  trabajar(): void {
    console.log("Humano trabajando");
  }

  comer(): void {
    console.log("Humano comiendo");
  }

  dormir(): void {
    console.log("Humano durmiendo");
  }
}

class Robot implements ITrabajador {
  trabajar(): void {
    console.log("Robot trabajando");
  }
}

const humano = new Humano();
humano.trabajar();
humano.comer();
humano.dormir();

const robot = new Robot();
robot.trabajar();

// 5. DIP - Principio de Inversión de Dependencias
interface IBaseDeDatos {
  conectar(): void;
  guardar(datos: string): void;
}

class MySQLDatabase implements IBaseDeDatos {
  conectar(): void {
    console.log("Conectando a MySQL");
  }

  guardar(datos: string): void {
    console.log(`Guardando en MySQL: ${datos}`);
  }
}

class PostgreSQLDatabase implements IBaseDeDatos {
  conectar(): void {
    console.log("Conectando a PostgreSQL");
  }

  guardar(datos: string): void {
    console.log(`Guardando en PostgreSQL: ${datos}`);
  }
}

class Aplicacion {
  constructor(private database: IBaseDeDatos) {}

  procesarDatos(datos: string): void {
    this.database.conectar();
    this.database.guardar(datos);
  }
}

const mysqlDb = new MySQLDatabase();
const postgresDb = new PostgreSQLDatabase();
const appMysql = new Aplicacion(mysqlDb);
const appPostgres = new Aplicacion(postgresDb);
appMysql.procesarDatos("Datos importantes");
appPostgres.procesarDatos("Datos importantes");

// Ejemplo integrado de notificaciones
interface INotificador {
  enviar(mensaje: string): void;
}

class EmailNotificador implements INotificador {
  enviar(mensaje: string): void {
    console.log(`Enviando email: ${mensaje}`);
  }
}

class SMSNotificador implements INotificador {
  enviar(mensaje: string): void {
    console.log(`Enviando SMS: ${mensaje}`);
  }
}

class PushNotificador implements INotificador {
  enviar(mensaje: string): void {
    console.log(`Enviando push: ${mensaje}`);
  }
}

class ServicioNotificaciones {
  private notificadores: INotificador[] = [];

  agregarNotificador(notificador: INotificador): void {
    this.notificadores.push(notificador);
  }

  notificarTodos(mensaje: string): void {
    this.notificadores.forEach((notificador) => notificador.enviar(mensaje));
  }
}

const servicioNotificaciones = new ServicioNotificaciones();
servicioNotificaciones.agregarNotificador(new EmailNotificador());
servicioNotificaciones.agregarNotificador(new SMSNotificador());
servicioNotificaciones.agregarNotificador(new PushNotificador());

const usuarioNotificaciones = new Usuario("Ana", "ana@email.com");
servicioNotificaciones.notificarTodos(`Bienvenida ${usuarioNotificaciones.nombre}!`);
