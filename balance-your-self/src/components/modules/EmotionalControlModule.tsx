import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Heart, 
  Brain, 
  Moon, 
  Plus, 
  Calendar, 
  Smile,
  Frown,
  Meh,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';

interface MoodEntry {
  id: number;
  date: string;
  mood: number;
  note: string;
  stress: number;
  energy: number;
  triggers: string[];
}

interface MeditationSession {
  id: number;
  name: string;
  duration: number;
  category: string;
  description: string;
}

interface EmotionalGoal {
  id: number;
  title: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
}

interface EmotionalControlProps {
  onBack: () => void;
}

const EmotionalControlModule = ({ onBack }: EmotionalControlProps) => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    { 
      id: 1, 
      date: '2024-01-29', 
      mood: 4, 
      note: 'Día productivo en el trabajo', 
      stress: 3, 
      energy: 4,
      triggers: ['trabajo', 'ejercicio']
    },
    { 
      id: 2, 
      date: '2024-01-28', 
      mood: 3, 
      note: 'Algo cansado pero estable', 
      stress: 4, 
      energy: 2,
      triggers: ['cansancio', 'reuniones']
    },
  ]);

  const [emotionalGoals] = useState<EmotionalGoal[]>([
    { id: 1, title: 'Meditación diaria', description: '10 minutos al día', progress: 15, target: 30, completed: false },
    { id: 2, title: 'Registro de emociones', description: 'Anotar estado diario', progress: 12, target: 15, completed: false },
    { id: 3, title: 'Ejercicios de respiración', description: '5 veces por semana', progress: 8, target: 10, completed: false },
  ]);

  const [currentMood, setCurrentMood] = useState(3);
  const [currentStress, setCurrentStress] = useState(3);
  const [currentEnergy, setCurrentEnergy] = useState(3);
  const [moodNote, setMoodNote] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [customTrigger, setCustomTrigger] = useState('');

  const [emotionalTechnique, setEmotionalTechnique] = useState({
    name: '',
    category: '',
    description: '',
    steps: '',
    duration: ''
  });

  const commonTriggers = [
    'trabajo', 'familia', 'ejercicio', 'dinero', 'salud', 'relaciones', 
    'clima', 'sueño', 'alimentación', 'estrés', 'cambios', 'responsabilidades'
  ];

  const getMoodIcon = (mood: number) => {
    if (mood >= 4) return <Smile className="w-6 h-6 text-green-500" />;
    if (mood >= 3) return <Meh className="w-6 h-6 text-yellow-500" />;
    return <Frown className="w-6 h-6 text-red-500" />;
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return 'text-green-600';
    if (mood >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const addMoodEntry = () => {
    if (moodNote.trim()) {
      const newEntry: MoodEntry = {
        id: moodEntries.length + 1,
        date: new Date().toISOString().split('T')[0],
        mood: currentMood,
        note: moodNote,
        stress: currentStress,
        energy: currentEnergy,
        triggers: selectedTriggers
      };
      
      setMoodEntries([newEntry, ...moodEntries]);
      setMoodNote('');
      setCurrentMood(3);
      setCurrentStress(3);
      setCurrentEnergy(3);
      setSelectedTriggers([]);
    }
  };

  const addTrigger = (trigger: string) => {
    if (!selectedTriggers.includes(trigger)) {
      setSelectedTriggers([...selectedTriggers, trigger]);
    }
  };

  const removeTrigger = (trigger: string) => {
    setSelectedTriggers(selectedTriggers.filter(t => t !== trigger));
  };

  const addCustomTrigger = () => {
    if (customTrigger.trim() && !selectedTriggers.includes(customTrigger)) {
      setSelectedTriggers([...selectedTriggers, customTrigger]);
      setCustomTrigger('');
    }
  };

  const addEmotionalTechnique = () => {
    if (emotionalTechnique.name && emotionalTechnique.description) {
      // Aquí se agregaría la técnica a la lista
      setEmotionalTechnique({
        name: '',
        category: '',
        description: '',
        steps: '',
        duration: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-accent-light flex items-center gap-2">
            <Heart className="w-8 h-8" />
            Control Emocional y Bienestar
          </h2>
          <p className="text-muted-foreground">
            Gestiona tu bienestar mental y emocional de manera integral
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Volver al inicio
        </Button>
      </div>

      <Tabs defaultValue="mood" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="mood" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Estado
          </TabsTrigger>
          <TabsTrigger value="meditation" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Meditación
          </TabsTrigger>
          <TabsTrigger value="techniques" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Técnicas
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Objetivos
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Análisis
          </TabsTrigger>
        </TabsList>

        {/* Estado de Ánimo Avanzado */}
        <TabsContent value="mood" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Registro completo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-accent-light" />
                  Registro Emocional Completo
                </CardTitle>
                <CardDescription>
                  Registra tu estado emocional con detalles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Estado de ánimo (1-5)</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={currentMood}
                        onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2">
                        {getMoodIcon(currentMood)}
                        <span className={`font-medium ${getMoodColor(currentMood)}`}>
                          {currentMood}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Nivel de estrés (1-5)</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={currentStress}
                        onChange={(e) => setCurrentStress(parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="font-medium text-primary">{currentStress}</span>
                    </div>
                  </div>

                  <div>
                    <Label>Nivel de energía (1-5)</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={currentEnergy}
                        onChange={(e) => setCurrentEnergy(parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="font-medium text-accent">{currentEnergy}</span>
                    </div>
                  </div>
                </div>

                {/* Disparadores emocionales */}
                <div className="space-y-3">
                  <Label>Disparadores emocionales</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonTriggers.map((trigger) => (
                      <Button
                        key={trigger}
                        variant={selectedTriggers.includes(trigger) ? "default" : "outline"}
                        size="sm"
                        onClick={() => selectedTriggers.includes(trigger) ? removeTrigger(trigger) : addTrigger(trigger)}
                      >
                        {trigger}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={customTrigger}
                      onChange={(e) => setCustomTrigger(e.target.value)}
                      placeholder="Agregar disparador personalizado"
                    />
                    <Button onClick={addCustomTrigger} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {selectedTriggers.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTriggers.map((trigger) => (
                        <Badge 
                          key={trigger} 
                          variant="secondary" 
                          className="cursor-pointer"
                          onClick={() => removeTrigger(trigger)}
                        >
                          {trigger} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moodNote">Reflexión del día</Label>
                  <Textarea
                    id="moodNote"
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="¿Qué ha influido en tu estado emocional hoy? ¿Cómo te sientes?"
                    rows={4}
                  />
                </div>

                <Button onClick={addMoodEntry} className="w-full bg-accent-light hover:bg-accent-light/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar Estado Completo
                </Button>
              </CardContent>
            </Card>

            {/* Historial detallado */}
            <Card>
              <CardHeader>
                <CardTitle>Historial Emocional</CardTitle>
                <CardDescription>
                  Análisis de tus últimos registros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodEntries.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="p-4 bg-muted rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString('es-ES')}
                        </span>
                        <div className="flex items-center gap-2">
                          {getMoodIcon(entry.mood)}
                          <span className={`font-medium ${getMoodColor(entry.mood)}`}>
                            {entry.mood}/5
                          </span>
                        </div>
                      </div>
                      <p className="text-sm">{entry.note}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Estrés: {entry.stress}/5</span>
                        <span>Energía: {entry.energy}/5</span>
                      </div>
                      {entry.triggers.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.triggers.map((trigger) => (
                            <Badge key={trigger} variant="outline" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Técnicas Emocionales */}
        <TabsContent value="techniques" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Crear Técnica Personalizada
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="techniqueName">Nombre de la técnica</Label>
                  <Input
                    id="techniqueName"
                    value={emotionalTechnique.name}
                    onChange={(e) => setEmotionalTechnique({...emotionalTechnique, name: e.target.value})}
                    placeholder="Ej: Respiración 4-7-8"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={emotionalTechnique.category} onValueChange={(value) => setEmotionalTechnique({...emotionalTechnique, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="respiracion">Respiración</SelectItem>
                      <SelectItem value="mindfulness">Mindfulness</SelectItem>
                      <SelectItem value="relajacion">Relajación</SelectItem>
                      <SelectItem value="cognitiva">Técnica Cognitiva</SelectItem>
                      <SelectItem value="corporal">Técnica Corporal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={emotionalTechnique.description}
                    onChange={(e) => setEmotionalTechnique({...emotionalTechnique, description: e.target.value})}
                    placeholder="¿Para qué sirve esta técnica?"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="steps">Pasos a seguir</Label>
                  <Textarea
                    id="steps"
                    value={emotionalTechnique.steps}
                    onChange={(e) => setEmotionalTechnique({...emotionalTechnique, steps: e.target.value})}
                    placeholder="1. Primer paso&#10;2. Segundo paso&#10;3. Tercer paso..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duración (minutos)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={emotionalTechnique.duration}
                    onChange={(e) => setEmotionalTechnique({...emotionalTechnique, duration: e.target.value})}
                    placeholder="5"
                  />
                </div>

                <Button onClick={addEmotionalTechnique} className="w-full bg-primary hover:bg-primary/90">
                  Agregar Técnica
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Técnicas Recomendadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Respiración 4-7-8</h4>
                    <p className="text-sm text-muted-foreground mb-2">Para reducir ansiedad y estrés</p>
                    <p className="text-xs text-muted-foreground">
                      1. Inhala por 4 segundos<br/>
                      2. Mantén por 7 segundos<br/>
                      3. Exhala por 8 segundos
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Técnica 5-4-3-2-1</h4>
                    <p className="text-sm text-muted-foreground mb-2">Para centrar la atención</p>
                    <p className="text-xs text-muted-foreground">
                      5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles, 1 que saboreas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Objetivos Emocionales */}
        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emotionalGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progreso</span>
                      <span>{goal.progress}/{goal.target}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-accent-light h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                      ></div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      variant={goal.completed ? "secondary" : "default"}
                    >
                      {goal.completed ? 'Completado' : 'Continuar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Análisis de Patrones */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patrones Emocionales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Disparadores más frecuentes</h4>
                    <p className="text-sm text-muted-foreground">Trabajo (40%), Estrés (25%), Sueño (20%)</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Mejor momento del día</h4>
                    <p className="text-sm text-muted-foreground">Mañanas (promedio 4.2/5)</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Técnica más efectiva</h4>
                    <p className="text-sm text-muted-foreground">Meditación mindfulness</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-accent-light/10 rounded-lg">
                    <h4 className="font-medium mb-1 text-accent-light">💡 Sugerencia</h4>
                    <p className="text-sm text-muted-foreground">
                      Practica técnicas de respiración cuando detectes estrés laboral
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <h4 className="font-medium mb-1 text-primary">⏰ Rutina</h4>
                    <p className="text-sm text-muted-foreground">
                      Mantén tu rutina matutina de bienestar, es tu momento más equilibrado
                    </p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <h4 className="font-medium mb-1 text-accent">🎯 Objetivo</h4>
                    <p className="text-sm text-muted-foreground">
                      Intenta meditar 10 minutos diarios para mejorar tu promedio general
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmotionalControlModule;