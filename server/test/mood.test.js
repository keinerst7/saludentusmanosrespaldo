const request = require("supertest");
const app = require("../app");
const MoodModel = require("../modelo/moodModel");

// ✅ Mock del modelo para no depender de la BD real
jest.mock("../modelo/moodModel");

describe("CRUD Mood API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 🔹 GET ALL
  it("GET /api/moods debe devolver todas las entradas", async () => {
    const mockData = [
      { id: 1, mood: "Feliz" },
      { id: 2, mood: "Triste" },
    ];
    MoodModel.getAll.mockResolvedValue(mockData);

    const res = await request(app).get("/api/moods");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
    expect(MoodModel.getAll).toHaveBeenCalled();
  });

  // 🔹 GET BY ID
  it("GET /api/moods/:id debe devolver una entrada", async () => {
    const mockEntry = { id: 1, mood: "Feliz" };
    MoodModel.getById.mockResolvedValue(mockEntry);

    const res = await request(app).get("/api/moods/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockEntry);
    expect(MoodModel.getById).toHaveBeenCalledWith("1");
  });

  // 🔹 GET BY ID (no existe)
  it("GET /api/moods/:id debe devolver 404 si no existe", async () => {
    MoodModel.getById.mockResolvedValue(null);

    const res = await request(app).get("/api/moods/99");

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "Entrada no encontrada" });
  });

  // 🔹 POST
  it("POST /api/moods debe crear una nueva entrada", async () => {
    const newMood = { id: 3, mood: "Motivado" };
    MoodModel.create.mockResolvedValue(newMood);

    const res = await request(app).post("/api/moods").send({ mood: "Motivado" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newMood);
    expect(MoodModel.create).toHaveBeenCalledWith({ mood: "Motivado" });
  });

  // 🔹 PUT
  it("PUT /api/moods/:id debe actualizar una entrada", async () => {
    const updatedMood = { id: 1, mood: "Relajado" };
    MoodModel.update.mockResolvedValue(updatedMood);

    const res = await request(app).put("/api/moods/1").send({ mood: "Relajado" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(updatedMood);
    expect(MoodModel.update).toHaveBeenCalledWith("1", { mood: "Relajado" });
  });

  // 🔹 DELETE
  it("DELETE /api/moods/:id debe eliminar una entrada", async () => {
    const deleteResult = { message: "Registro eliminado correctamente" };
    MoodModel.delete.mockResolvedValue(deleteResult);

    const res = await request(app).delete("/api/moods/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(deleteResult);
    expect(MoodModel.delete).toHaveBeenCalledWith("1");
  });
});