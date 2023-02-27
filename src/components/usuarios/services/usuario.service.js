export class UsuarioService {
  constructor() {
    this.accessToken = null;
    this.isLoggedIn = false;
    this.usuarios = [];
  }

  async getUsuarios() {
    // this.usuarios = [
    //   { id: 'X1', nombre: 'Juan' },
    //   { id: 'X2', nombre: 'David' },
    // ];
    // return this.usuarios;

    try {
      const response = await fetch('https://localhost:44361/api/usuario');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UsuarioService;
