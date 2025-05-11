export default class User {
  constructor(id, nome, email) {
    this.id = id;
    this.nome = nome;
    this.email = email;
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new User(doc.id, data.nome, data.email);
  }

  toFirestore() {
    return {
      nome: this.nome,
      email: this.email,
    };
  }
}