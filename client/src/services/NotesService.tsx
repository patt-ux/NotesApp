import axios from "axios";

// sends/recieves data from notes api running on port 5000 or proxy.
const http = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json"
  }
});

class NotesService {
  getAll() {
    return http.get("/notes");
  }

  get(id:any) {
    return http.get(`/notes/${id}`);
  }

  create(data:any) {
    return http.post("/notes", data);
  }

  update(id:any, data:any) {
    return http.put(`/notes/${id}`, data);
  }

  delete(id:any) {
    return http.delete(`/notes/${id}`);
  }

  deleteAll() {
    return http.delete(`/notes`);
  }
}

export default new NotesService();