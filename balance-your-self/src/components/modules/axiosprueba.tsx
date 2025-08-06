//const NutritionModule = ({ onBack }: NutritionModuleProps) => {



//useEffect(() => {
    // axios.get('http://localhost:3000/api/recipes').then(res => {
    //   console.log("res", res)
    // })

// }, []);



//const [recipes, setRecipes] = useState<Recipe[]>([
  //  {
  //    id: 1,
  //    name: "Ensalada Mediterránea",
  //    ingredients: ["Tomate", "Pepino", "Aceitunas", "Queso feta", "Aceite de oliva"],
  //    instructions: "Cortar todos los vegetales, mezclar con aceite de oliva y servir fresco.",
  //    calories: 320,
  //    time: 15,
  //    category: "Ensaladas",
  //    difficulty: "Fácil",
  //    servings: 2,
  //    macros: { protein: 12, carbs: 25, fat: 18 }
  //  },
  //  {
  //    id: 2,
  //    name: "Smoothie Verde Energizante",
  //    ingredients: ["Espinacas", "Plátano", "Manzana verde", "Jengibre", "Agua de coco"],
  //    instructions: "Licuar todos los ingredientes hasta obtener consistencia suave.",
  //    calories: 180,
  //    time: 5,
  //    category: "Bebidas",
  //    difficulty: "Fácil",
  //    servings: 1,
  //    macros: { protein: 4, carbs: 35, fat: 2 }
  //  }
  //]);
//
  //const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([
  //  { id: 1, name: "Avena con fresas", quantity: 1, unit: "tazón", calories: 250, meal: 'breakfast', date: new Date().toISOString().split('T')[0] },
  //  { id: 2, name: "Pollo a la plancha", quantity: 150, unit: "g", calories: 180, meal: 'lunch', date: new Date().toISOString().split('T')[0] }
  //]);
//
  //const [nutrientGoals, setNutrientGoals] = useState<NutrientGoals>({
  //  protein: 150,
  //  carbs: 250,
  //  fat: 80,
  //  fiber: 25,
  //  water: 2500
  //});
//
  //const [newRecipe, setNewRecipe] = useState({
  //  name: '',
  //  ingredients: '',
  //  instructions: '',
  //  calories: '',
  //  time: '',
  //  category: '',
  //  difficulty: 'Fácil',
  //  servings: '1',
  //  protein: '',
  //  carbs: '',
  //  fat: ''
  //});
//
//
  //const [newFoodEntry, setNewFoodEntry] = useState({
  //  name: '',
  //  quantity: '',
  //  unit: 'g',
  //  calories: '',
  //  meal: 'breakfast' as MealType // Usar el tipo definido
  //});
//
  //const [waterIntake, setWaterIntake] = useState(2100);
  //const [dailyCalories, setDailyCalories] = useState(1847);
  //const [calorieGoal, setCalorieGoal] = useState(2000);
//
  //const addRecipe = () => {
  //  console.log("data: ", newRecipe)
//
  ////  axios.post('http://localhost:3000/api/recipes', {
  //    "id": 1,
  //    "name": newRecipe.name,
  //    "ingredients": newRecipe.ingredients,
  //    "instructions": newRecipe.instructions,
  //    "calories": newRecipe.calories,
  //    "time": 1,
  //    "category": newRecipe.category,
  //    "difficulty": newRecipe.difficulty,
  //    "servings": newRecipe.servings,
  //    "protein": newRecipe.protein,
  //    "carbs": newRecipe.carbs,
  //    "fat": newRecipe.fat
  ////  }).then(res => 
  //    console.log("guardado: ",res)
  ////  )