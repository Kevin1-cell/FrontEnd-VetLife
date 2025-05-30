export interface User {
  id: string;
  username: string;
  password: string;
  role: "client" | "admin";
  // Datos adicionales para clientes
  nombre?: string;
  correo?: string;
  telefono?: string;
  fechaNacimiento?: string;
}

export interface Pet {
  id: string;
  clientId: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  peso: number;
  color: string;
  observaciones: string;
}

export interface Veterinarian {
  id: string;
  nombre: string;
  especialidad: string;
  experiencia: number;
  telefono: string;
  correo: string;
  horario: string;
  foto?: string;
  descripcion: string;
}

// Usuarios predefinidos para testing
const defaultUsers: User[] = [
  {
    id: "1",
    username: "cliente1",
    password: "123456",
    role: "client",
    nombre: "Juan Pérez",
    correo: "juan@email.com",
    telefono: "3001234567",
    fechaNacimiento: "1990-05-15",
  },
  {
    id: "2",
    username: "admin",
    password: "admin123",
    role: "admin",
    nombre: "Dr. María García",
    correo: "admin@vetlife.com",
  },
];

// Mascotas de ejemplo
const defaultPets: Pet[] = [
  {
    id: "1",
    clientId: "1",
    nombre: "Max",
    especie: "Perro",
    raza: "Golden Retriever",
    edad: 3,
    peso: 25,
    color: "Dorado",
    observaciones: "Muy juguetón y amigable",
  },
];

// Veterinarios de ejemplo
const defaultVeterinarians: Veterinarian[] = [
  {
    id: "1",
    nombre: "Dr. Carlos Mendoza",
    especialidad: "Medicina General",
    experiencia: 8,
    telefono: "3001234567",
    correo: "carlos@vetlife.com",
    horario: "Lun-Vie 8:00-18:00",
    descripcion:
      "Especialista en medicina general con amplia experiencia en el cuidado de mascotas.",
  },
  {
    id: "2",
    nombre: "Dra. Ana Rodríguez",
    especialidad: "Cirugía",
    experiencia: 12,
    telefono: "3009876543",
    correo: "ana@vetlife.com",
    horario: "Mar-Sáb 9:00-17:00",
    descripcion:
      "Cirujana veterinaria especializada en procedimientos complejos y cirugías de emergencia.",
  },
  {
    id: "3",
    nombre: "Dr. Luis García",
    especialidad: "Dermatología",
    experiencia: 6,
    telefono: "3005555555",
    correo: "luis@vetlife.com",
    horario: "Lun-Mié-Vie 10:00-16:00",
    descripcion: "Experto en problemas de piel y alergias en mascotas.",
  },
];

class AuthService {
  private users: User[] = [];
  private pets: Pet[] = [];
  private veterinarians: Veterinarian[] = [];
  private currentUser: User | null = null;

  constructor() {
    // Cargar datos del localStorage o usar datos por defecto
    this.loadData();
  }

  private loadData() {
    if (typeof window !== "undefined") {
      const savedUsers = localStorage.getItem("vetlife_users");
      const savedPets = localStorage.getItem("vetlife_pets");
      const savedVeterinarians = localStorage.getItem("vetlife_veterinarians");

      this.users = savedUsers ? JSON.parse(savedUsers) : [...defaultUsers];
      this.pets = savedPets ? JSON.parse(savedPets) : [...defaultPets];
      this.veterinarians = savedVeterinarians
        ? JSON.parse(savedVeterinarians)
        : [...defaultVeterinarians];
    } else {
      // Si estamos en el servidor, usar datos por defecto
      this.users = [...defaultUsers];
      this.pets = [...defaultPets];
      this.veterinarians = [...defaultVeterinarians];
    }
  }

  private saveData() {
    if (typeof window !== "undefined") {
      localStorage.setItem("vetlife_users", JSON.stringify(this.users));
      localStorage.setItem("vetlife_pets", JSON.stringify(this.pets));
      localStorage.setItem(
        "vetlife_veterinarians",
        JSON.stringify(this.veterinarians)
      );
    }
  }

  // Autenticación
  async login(
    username: string,
    password: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.currentUser = user;
      if (typeof window !== "undefined") {
        localStorage.setItem("vetlife_current_user", JSON.stringify(user));
      }
      return { success: true, user };
    }

    return { success: false, error: "Usuario o contraseña incorrectos" };
  }

  async register(
    userData: Omit<User, "id" | "role">
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Verificar si el usuario ya existe
    if (this.users.find((u) => u.username === userData.username)) {
      return { success: false, error: "El usuario ya existe" };
    }

    if (this.users.find((u) => u.correo === userData.correo)) {
      return { success: false, error: "El correo ya está registrado" };
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      role: "client",
    };

    this.users.push(newUser);
    this.saveData();

    return { success: true, user: newUser };
  }

  logout() {
    this.currentUser = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("vetlife_current_user");
    }
  }

  getCurrentUser(): User | null {
    if (!this.currentUser && typeof window !== "undefined") {
      const saved = localStorage.getItem("vetlife_current_user");
      this.currentUser = saved ? JSON.parse(saved) : null;
    }
    return this.currentUser;
  }

  // Gestión de usuarios (Admin)
  async getAllUsers(): Promise<User[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return this.users.filter((u) => u.role === "client");
  }

  async getUserById(id: string): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.users.find((u) => u.id === id) || null;
  }

  async updateUser(
    id: string,
    userData: Partial<User>
  ): Promise<{ success: boolean; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return { success: false, error: "Usuario no encontrado" };
    }

    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    this.saveData();
    return { success: true };
  }

  async deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return { success: false, error: "Usuario no encontrado" };
    }

    this.users.splice(userIndex, 1);
    // También eliminar las mascotas del usuario
    this.pets = this.pets.filter((p) => p.clientId !== id);
    this.saveData();
    return { success: true };
  }

  // Gestión de mascotas
  async getPetsByClient(clientId: string): Promise<Pet[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return this.pets.filter((p) => p.clientId === clientId);
  }

  async addPet(
    petData: Omit<Pet, "id">
  ): Promise<{ success: boolean; pet?: Pet; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const newPet: Pet = {
      ...petData,
      id: Date.now().toString(),
    };

    this.pets.push(newPet);
    this.saveData();
    return { success: true, pet: newPet };
  }

  async updatePet(
    id: string,
    petData: Partial<Pet>
  ): Promise<{ success: boolean; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const petIndex = this.pets.findIndex((p) => p.id === id);
    if (petIndex === -1) {
      return { success: false, error: "Mascota no encontrada" };
    }

    this.pets[petIndex] = { ...this.pets[petIndex], ...petData };
    this.saveData();
    return { success: true };
  }

  async deletePet(id: string): Promise<{ success: boolean; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const petIndex = this.pets.findIndex((p) => p.id === id);
    if (petIndex === -1) {
      return { success: false, error: "Mascota no encontrada" };
    }

    this.pets.splice(petIndex, 1);
    this.saveData();
    return { success: true };
  }

  // Gestión de veterinarios
  async getAllVeterinarians(): Promise<Veterinarian[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return [...this.veterinarians];
  }

  async addVeterinarian(
    vetData: Omit<Veterinarian, "id">
  ): Promise<{
    success: boolean;
    veterinarian?: Veterinarian;
    error?: string;
  }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verificar si ya existe un veterinario con el mismo correo
    if (this.veterinarians.find((v) => v.correo === vetData.correo)) {
      return {
        success: false,
        error: "Ya existe un veterinario con este correo",
      };
    }

    const newVet: Veterinarian = {
      ...vetData,
      id: Date.now().toString(),
    };

    this.veterinarians.push(newVet);
    this.saveData();
    return { success: true, veterinarian: newVet };
  }

  async updateVeterinarian(
    id: string,
    vetData: Partial<Veterinarian>
  ): Promise<{ success: boolean; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const vetIndex = this.veterinarians.findIndex((v) => v.id === id);
    if (vetIndex === -1) {
      return { success: false, error: "Veterinario no encontrado" };
    }

    // Verificar si el correo ya existe en otro veterinario
    if (
      vetData.correo &&
      this.veterinarians.find((v) => v.correo === vetData.correo && v.id !== id)
    ) {
      return {
        success: false,
        error: "Ya existe un veterinario con este correo",
      };
    }

    this.veterinarians[vetIndex] = {
      ...this.veterinarians[vetIndex],
      ...vetData,
    };
    this.saveData();
    return { success: true };
  }

  async deleteVeterinarian(
    id: string
  ): Promise<{ success: boolean; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const vetIndex = this.veterinarians.findIndex((v) => v.id === id);
    if (vetIndex === -1) {
      return { success: false, error: "Veterinario no encontrado" };
    }

    this.veterinarians.splice(vetIndex, 1);
    this.saveData();
    return { success: true };
  }

  async getVeterinarianById(id: string): Promise<Veterinarian | null> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return this.veterinarians.find((v) => v.id === id) || null;
  }
}

export const authService = new AuthService();
