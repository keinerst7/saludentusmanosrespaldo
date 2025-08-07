import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
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
  CheckCircle,
  Trash2,
  BarChart3,
  Target,
  Star,
  Eye,
  Clock
} from 'lucide-react';
import MotivationTab from './MotivationTab';

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
  completedDate?: string;
}

interface SleepEntry {
  id: number;
  date: string;
  hours: number;
  quality: number;
  note?: string;
}

interface WellnessModuleProps {
  onBack: () => void;
  initialTab?: string;
}

const WellnessModule = ({ onBack }: WellnessModuleProps) => {
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
      triggers: ['cansancio', 'trabajo']
    },
  ]);

  const [meditationSessions] = useState<MeditationSession[]>([
    { id: 1, name: 'Respiración Consciente', duration: 5, category: 'Relajación', description: 'Ejercicio básico de respiración para reducir el estrés' },
    { id: 2, name: 'Mindfulness Matutino', duration: 7, category: 'Mindfulness', description: 'Sesión para comenzar el día con claridad mental' },
    { id: 3, name: 'Relajación Nocturna', duration: 6, category: 'Sueño', description: 'Meditación para preparar el cuerpo para el descanso' },
    { id: 4, name: 'Gratitud Diaria', duration: 5, category: 'Positividad', description: 'Práctica de gratitud para mejorar el bienestar emocional' },
    { id: 5, name: 'Serenidad Nocturna', duration: 7, category: 'Sueño', description: 'Meditación relajante para preparar el descanso' },
    { id: 6, name: 'Calma Interior', duration: 6, category: 'Relajación', description: 'Sesión para encontrar paz en momentos de estrés' }
  ]);

  const [completedMeditations, setCompletedMeditations] = useState<MeditationSession[]>([
    { id: 1, name: 'Respiración Consciente', duration: 10, category: 'Relajación', description: 'Ejercicio básico de respiración', completedDate: '2024-01-29' }
  ]);

  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([
    { id: 1, date: '2024-01-29', hours: 7.5, quality: 4, note: 'Buen descanso' },
    { id: 2, date: '2024-01-28', hours: 6, quality: 3, note: 'Me desperté varias veces' }
  ]);

  // Estados para formularios
  const [currentMood, setCurrentMood] = useState(3);
  const [currentStress, setCurrentStress] = useState(3);
  const [currentEnergy, setCurrentEnergy] = useState(3);
  const [moodNote, setMoodNote] = useState('');
  const [sleepHours, setSleepHours] = useState('7');
  const [sleepQuality, setSleepQuality] = useState(4);
  const [sleepNote, setSleepNote] = useState('');

  // Estados para meditación
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSession, setCurrentSession] = useState<MeditationSession | null>(null);
  const [sessionTime, setSessionTime] = useState(0);

  // Estados para popups y diálogos
  const [showMeditationComplete, setShowMeditationComplete] = useState(false);
  const [showMeditationConfirm, setShowMeditationConfirm] = useState(false);
  const [showSleepSuccess, setShowSleepSuccess] = useState(false);
  const [showMoodConfirm, setShowMoodConfirm] = useState(false);
  const [showWellnessSummary, setShowWellnessSummary] = useState(false);
  const [showWellnessAnalysis, setShowWellnessAnalysis] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<number | null>(null);
  const [selectedMoodEntry, setSelectedMoodEntry] = useState<MoodEntry | null>(null);
  const [showMoodDetails, setShowMoodDetails] = useState(false);
  const [showMeditationDetails, setShowMeditationDetails] = useState<MeditationSession | null>(null);
  const [meditationToDelete, setMeditationToDelete] = useState<MeditationSession | null>(null);
  const [showSleepDetails, setShowSleepDetails] = useState<SleepEntry | null>(null);
  const [sleepToDelete, setSleepToDelete] = useState<number | null>(null);
  const [showEarlyExitMessage, setShowEarlyExitMessage] = useState(false);

  const { toast } = useToast();

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

  const getMoodText = (mood: number) => {
    const moodTexts = ['Muy mal', 'Mal', 'Regular', 'Bien', 'Excelente'];
    return moodTexts[mood - 1] || 'Regular';
  };

  const getMotivationalMessage = (mood: number) => {
    if (mood >= 4) {
      return "¡Fantástico! Tu energía positiva es contagiosa. Sigue brillando así.";
    } else if (mood >= 3) {
      return "Un día equilibrado es un buen día. Mantén el rumbo y sonríe.";
    } else {
      return "Los días difíciles también pasan. Mañana será un nuevo comienzo.";
    }
  };

  const getSleepTip = (hours: number, quality: number) => {
    if (hours < 6) {
      return "💤 Intenta dormir al menos 7-8 horas. Tu cuerpo necesita más descanso para recuperarse completamente.";
    } else if (quality <= 2) {
      return "🌙 Para mejorar la calidad del sueño, evita pantallas 1 hora antes de acostarte y mantén tu habitación fresca.";
    } else if (hours >= 8 && quality >= 4) {
      return "⭐ ¡Excelente descanso! Tu cuerpo y mente te lo agradecen. Mantén esta rutina.";
    } else {
      return "🛏️ Buen descanso general. Considera crear una rutina relajante antes de dormir para optimizar tu sueño.";
    }
  };

  const handleMoodRegistration = () => {
    if (moodNote.trim()) {
      const newEntry: MoodEntry = {
        id: moodEntries.length + 1,
        date: new Date().toISOString().split('T')[0],
        mood: currentMood,
        note: moodNote,
        stress: currentStress,
        energy: currentEnergy,
        triggers: []
      };
      
      setMoodEntries([newEntry, ...moodEntries]);
      setMoodNote('');
      setCurrentMood(3);
      setCurrentStress(3);
      setCurrentEnergy(3);
      setShowMoodConfirm(false);
      
      // Mostrar mensaje motivacional
      toast({
        title: "✅ Estado registrado",
        description: getMotivationalMessage(currentMood),
      });
    }
  };

  const handleSleepRegistration = () => {
    const newEntry: SleepEntry = {
      id: sleepEntries.length + 1,
      date: new Date().toISOString().split('T')[0],
      hours: parseFloat(sleepHours),
      quality: sleepQuality,
      note: sleepNote
    };
    
    setSleepEntries([newEntry, ...sleepEntries]);
    setSleepHours('7');
    setSleepQuality(4);
    setSleepNote('');
    setShowSleepSuccess(true);
    
    toast({
      title: "✅ ¡Registro Exitoso!",
      description: "Tu información de sueño ha sido registrada correctamente.",
    });
  };

  const startMeditation = (session: MeditationSession) => {
    setCurrentSession(session);
    setSessionTime(0);
    setIsPlaying(true);
  };

  const toggleMeditation = () => {
    setIsPlaying(!isPlaying);
  };

  const finishMeditation = () => {
    setShowMeditationConfirm(true);
  };

  const confirmFinishMeditation = () => {
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        completedDate: new Date().toISOString().split('T')[0]
      };
      setCompletedMeditations([completedSession, ...completedMeditations]);
      setShowMeditationConfirm(false);
      setShowMeditationComplete(true);
      setIsPlaying(false);
      setCurrentSession(null);
      setSessionTime(0);
    }
  };

  const resetMeditation = () => {
    if (currentSession && sessionTime > 0 && sessionTime < currentSession.duration * 60) {
      setShowEarlyExitMessage(true);
    } else {
      setIsPlaying(false);
      setSessionTime(0);
      setCurrentSession(null);
    }
  };

  const confirmEarlyExit = () => {
    setIsPlaying(false);
    setSessionTime(0);
    setCurrentSession(null);
    setShowEarlyExitMessage(false);
  };

  const deleteMeditationSession = () => {
    if (meditationToDelete) {
      setCompletedMeditations(completedMeditations.filter(session => 
        session.id !== meditationToDelete.id || session.completedDate !== meditationToDelete.completedDate
      ));
      setMeditationToDelete(null);
      toast({
        title: "Sesión eliminada",
        description: "La sesión de meditación ha sido eliminada del historial.",
      });
    }
  };

  const deleteSleepEntry = () => {
    if (sleepToDelete) {
      setSleepEntries(sleepEntries.filter(entry => entry.id !== sleepToDelete));
      setSleepToDelete(null);
      toast({
        title: "Registro eliminado",
        description: "El registro de sueño ha sido eliminado.",
      });
    }
  };

  const deleteMoodEntry = (id: number) => {
    setEntryToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (entryToDelete) {
      setMoodEntries(moodEntries.filter(entry => entry.id !== entryToDelete));
      setEntryToDelete(null);
      setShowDeleteConfirm(false);
      toast({
        title: "Registro eliminado",
        description: "El registro de estado de ánimo ha sido eliminado.",
      });
    }
  };

  const viewMoodDetails = (entry: MoodEntry) => {
    setSelectedMoodEntry(entry);
    setShowMoodDetails(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Timer para meditación
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentSession) {
      interval = setInterval(() => {
        setSessionTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= currentSession.duration * 60) {
            setIsPlaying(false);
            setShowMeditationComplete(true);
            return currentSession.duration * 60;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, currentSession]);

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
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowWellnessSummary(true)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Registro
          </Button>
          <Button variant="outline" onClick={onBack}>
            Volver al inicio
          </Button>
        </div>
      </div>

      <Tabs defaultValue="mood" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mood" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Estado de Ánimo
          </TabsTrigger>
          <TabsTrigger value="meditation" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Meditación
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            Sueño
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        {/* Estado de Ánimo Mejorado */}
        <TabsContent value="mood" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Registro de estado actual mejorado */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-accent-light" />
                  ¿Cómo te sientes hoy?
                </CardTitle>
                <CardDescription>
                  Registra tu estado emocional actual
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
                          {getMoodText(currentMood)}
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

                <div className="space-y-2">
                  <Label htmlFor="moodNote">Notas sobre tu día</Label>
                  <Textarea
                    id="moodNote"
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="¿Qué ha influido en tu estado de ánimo hoy?"
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={() => setShowMoodConfirm(true)} 
                  className="w-full bg-accent-light hover:bg-accent-light/90"
                  disabled={!moodNote.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar Estado
                </Button>
              </CardContent>
            </Card>

            {/* Historial mejorado con acciones */}
            <Card>
              <CardHeader>
                <CardTitle>Historial Reciente</CardTitle>
                <CardDescription>
                  Tus últimos registros emocionales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodEntries.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString('es-ES')}
                        </span>
                        <div className="flex items-center gap-2">
                          {getMoodIcon(entry.mood)}
                          <span className={`font-medium ${getMoodColor(entry.mood)}`}>
                            {getMoodText(entry.mood)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm">{entry.note}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>Estrés: {entry.stress}/5</span>
                          <span>Energía: {entry.energy}/5</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => viewMoodDetails(entry)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteMoodEntry(entry.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Meditación Mejorada */}
        <TabsContent value="meditation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sesiones disponibles */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Sesiones de Meditación</h3>
              {meditationSessions.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{session.name}</CardTitle>
                      <Badge variant="secondary">{session.category}</Badge>
                    </div>
                    <CardDescription>
                      {session.duration} minutos • {session.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => startMeditation(session)}
                      className="w-full bg-accent-light hover:bg-accent-light/90"
                      disabled={isPlaying && currentSession?.id === session.id}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      {isPlaying && currentSession?.id === session.id ? 'En curso...' : 'Iniciar Sesión'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Reproductor de meditación mejorado */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-6 h-6 text-primary" />
                    Reproductor de Meditación
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentSession ? (
                    <>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">{currentSession.name}</h3>
                        <div className="text-3xl font-bold text-primary mb-4">
                          {formatTime(sessionTime)}
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 mb-4">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${(sessionTime / (currentSession.duration * 60)) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-center gap-4">
                        <Button
                          onClick={toggleMeditation}
                          variant="outline"
                          size="lg"
                        >
                          {isPlaying ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                        </Button>
                        <Button
                          onClick={finishMeditation}
                          variant="outline"
                          size="lg"
                        >
                          <CheckCircle className="w-6 h-6" />
                        </Button>
                        <Button
                          onClick={resetMeditation}
                          variant="outline"
                          size="lg"
                        >
                          <RotateCcw className="w-6 h-6" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Selecciona una sesión de meditación para comenzar
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Historial de meditaciones */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Sesiones Completadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {completedMeditations.slice(0, 3).map((session) => (
                      <div key={`${session.id}-${session.completedDate}`} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-sm">{session.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {session.duration} min • {session.completedDate}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">Completado</Badge>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs"
                              onClick={() => setShowMeditationDetails(session)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Ver
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs text-red-600 hover:text-red-700"
                              onClick={() => setMeditationToDelete(session)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm font-medium text-primary">
                        {completedMeditations.length} sesiones completadas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Sueño Mejorado */}
        <TabsContent value="sleep" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="w-6 h-6 text-accent" />
                  Registro Manual de Sueño
                </CardTitle>
                <CardDescription>
                  Registra la calidad de tu descanso nocturno
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sleepHours">Horas de sueño</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Registra el total de horas que dormiste (incluyendo despertares nocturnos)
                  </p>
                  <Input
                    id="sleepHours"
                    type="number"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    placeholder="8"
                    min="1"
                    max="12"
                    step="0.5"
                  />
                </div>

                <div>
                  <Label>Calidad del sueño (1-5)</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Evalúa qué tan reparador fue tu descanso (1=muy malo, 5=excelente)
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={sleepQuality}
                      onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="font-medium text-accent">{sleepQuality}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleepNote">Notas adicionales (opcional)</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Agrega cualquier detalle relevante: interrupciones, sueños, cómo te sientes al despertar, etc.
                  </p>
                  <Textarea
                    id="sleepNote"
                    value={sleepNote}
                    onChange={(e) => setSleepNote(e.target.value)}
                    placeholder="¿Cómo fue tu descanso? ¿Algo especial que quieras recordar?"
                    rows={2}
                  />
                </div>

                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {sleepHours}h
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Calidad: {sleepQuality}/5
                  </div>
                </div>

                <Button onClick={handleSleepRegistration} className="w-full bg-accent hover:bg-accent/90">
                  <Moon className="w-4 h-4 mr-2" />
                  Registrar Sueño
                </Button>
              </CardContent>
            </Card>

            {/* Historial de sueño con consejos */}
            <Card>
              <CardHeader>
                <CardTitle>Historial de Sueño</CardTitle>
                <CardDescription>
                  Gestiona tus registros recientes con consejos personalizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sleepEntries.slice(0, 4).map((entry) => (
                    <div key={entry.id} className="p-4 bg-muted rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs"
                            onClick={() => setShowSleepDetails(entry)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Ver detalles
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs text-red-600 hover:text-red-700"
                            onClick={() => setSleepToDelete(entry.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{entry.hours}h de sueño</span>
                        <Badge variant="outline">Calidad: {entry.quality}/5</Badge>
                      </div>
                      
                      {entry.note && (
                        <p className="text-sm bg-secondary/20 p-2 rounded italic">"{entry.note}"</p>
                      )}
                      
                      <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-300">
                        <p className="text-xs text-blue-700 font-medium">
                          💡 {getSleepTip(entry.hours, entry.quality)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {sleepEntries.length === 0 && (
                    <div className="text-center p-6 text-muted-foreground">
                      <Moon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Aún no tienes registros de sueño</p>
                      <p className="text-sm">Comienza a registrar tu descanso nocturno</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Historial General */}
        <TabsContent value="journal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resumen de actividades */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Resumen de Actividades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-lg font-bold text-primary">{moodEntries.length}</div>
                    <div className="text-xs text-muted-foreground">Estados registrados</div>
                  </div>
                  <div className="text-center p-3 bg-accent/10 rounded-lg">
                    <div className="text-lg font-bold text-accent">{completedMeditations.length}</div>
                    <div className="text-xs text-muted-foreground">Meditaciones</div>
                  </div>
                  <div className="text-center p-3 bg-accent-light/10 rounded-lg">
                    <div className="text-lg font-bold text-accent-light">{sleepEntries.length}</div>
                    <div className="text-xs text-muted-foreground">Registros de sueño</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/30 rounded-lg">
                    <div className="text-lg font-bold text-accent">8.2</div>
                    <div className="text-xs text-muted-foreground">Promedio ánimo</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progreso semanal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Progreso Semanal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Estados de ánimo</span>
                      <span className="text-sm">7/7</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Sesiones de meditación</span>
                      <span className="text-sm">5/7</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Registros de sueño</span>
                      <span className="text-sm">6/7</span>
                    </div>
                    <Progress value={86} className="h-2" />
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    🎉 ¡Excelente semana! Mantén el equilibrio entre descanso y actividad mental.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Nueva pestaña de Motivación */}
        <TabsContent value="motivation" className="space-y-6">
          <MotivationTab />
        </TabsContent>
      </Tabs>

      {/* Dialog de confirmación para registro de estado de ánimo */}
      <AlertDialog open={showMoodConfirm} onOpenChange={setShowMoodConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Deseas registrar tu estado?</AlertDialogTitle>
            <AlertDialogDescription>
              Estado: {getMoodText(currentMood)} • Estrés: {currentStress}/5 • Energía: {currentEnergy}/5
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar Registro</AlertDialogCancel>
            <AlertDialogAction onClick={handleMoodRegistration}>Registrar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de confirmación para finalizar meditación */}
      <AlertDialog open={showMeditationConfirm} onOpenChange={setShowMeditationConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Finalizar sesión de meditación?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres finalizar la sesión "{currentSession?.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowMeditationConfirm(false)}>Continuar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmFinishMeditation}>Finalizar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de meditación completada */}
      <Dialog open={showMeditationComplete} onOpenChange={setShowMeditationComplete}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl">🎉 ¡Felicidades!</DialogTitle>
            <DialogDescription className="text-lg">
              Has completado tu sesión de meditación
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-primary font-medium">
              "Cada pequeño paso hacia tu paz interior cuenta."
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowMeditationComplete(false)} className="w-full">
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de sueño registrado exitosamente */}
      <Dialog open={showSleepSuccess} onOpenChange={setShowSleepSuccess}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-xl">✅ ¡Registro Exitoso!</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Tu información de sueño ha sido guardada correctamente.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSleepSuccess(false)} className="w-full">
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para eliminar registro */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar registro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este registro?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog para detalles del estado de ánimo */}
      <Dialog open={showMoodDetails} onOpenChange={setShowMoodDetails}>
        <DialogContent className="max-w-md">
          {selectedMoodEntry && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getMoodIcon(selectedMoodEntry.mood)}
                  Detalles del {new Date(selectedMoodEntry.date).toLocaleDateString('es-ES')}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="font-bold">{getMoodText(selectedMoodEntry.mood)}</div>
                    <div className="text-xs text-muted-foreground">Estado</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{selectedMoodEntry.stress}/5</div>
                    <div className="text-xs text-muted-foreground">Estrés</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{selectedMoodEntry.energy}/5</div>
                    <div className="text-xs text-muted-foreground">Energía</div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Notas del día:</h4>
                  <p className="text-sm text-muted-foreground">{selectedMoodEntry.note}</p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Resumen y consejo:</h4>
                  <p className="text-sm">
                    {selectedMoodEntry.mood >= 4 
                      ? "Tuviste un excelente día. Recuerda qué actividades te hicieron sentir así para repetirlas."
                      : selectedMoodEntry.mood >= 3 
                      ? "Fue un día equilibrado. Pequeños ajustes en tu rutina pueden mejorar tu bienestar."
                      : "Fue un día desafiante. Recuerda que es normal tener días difíciles. Practica autocompasión."
                    }
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de resumen de bienestar */}
      <Dialog open={showWellnessSummary} onOpenChange={setShowWellnessSummary}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Resumen de Bienestar
            </DialogTitle>
            <DialogDescription>
              Promedios y consejos generales
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-lg font-bold text-primary">85%</div>
                <div className="text-xs text-muted-foreground">Bienestar general</div>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <div className="text-lg font-bold text-accent">7.2h</div>
                <div className="text-xs text-muted-foreground">Sueño promedio</div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Consejo personalizado:</h4>
              <p className="text-sm text-muted-foreground">
                Tu bienestar emocional está en un buen nivel. Continúa con las sesiones de meditación para mantener el equilibrio.
              </p>
            </div>

            <Button 
              onClick={() => setShowWellnessAnalysis(true)} 
              className="w-full"
              variant="outline"
            >
              Ver Análisis Completo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de análisis completo de bienestar */}
      <Dialog open={showWellnessAnalysis} onOpenChange={setShowWellnessAnalysis}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Análisis de Bienestar General
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Factores positivos */}
            <div>
              <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Factores Positivos Personales
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm">✅ Constancia en el registro emocional</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm">✅ Práctica regular de meditación</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm">✅ Horas de sueño dentro del rango saludable</p>
                </div>
              </div>
            </div>

            {/* Áreas de mejora */}
            <div>
              <h4 className="font-semibold text-amber-600 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Áreas de Mejora
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm font-medium">🎯 Gestión del estrés</p>
                  <p className="text-xs text-muted-foreground">Practica técnicas de respiración cuando sientas tensión</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm font-medium">🎯 Rutina de relajación</p>
                  <p className="text-xs text-muted-foreground">Establece una rutina nocturna para mejorar la calidad del sueño</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm font-medium text-primary">
                "Tu bienestar emocional es un jardín que florece con cuidado diario"
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de salida temprana de meditación */}
      <AlertDialog open={showEarlyExitMessage} onOpenChange={setShowEarlyExitMessage}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Terminar la sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              ¡No te rindas! Cada minuto de meditación cuenta. Puedes tomarte un descanso y retomar cuando te sientas listo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar meditando</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEarlyExit}>Terminar por ahora</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog para detalles de sesión de meditación */}
      <Dialog open={showMeditationDetails !== null} onOpenChange={() => setShowMeditationDetails(null)}>
        <DialogContent className="max-w-md">
          {showMeditationDetails && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-accent" />
                  Detalles de la Sesión
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <h3 className="font-semibold text-lg">{showMeditationDetails.name}</h3>
                  <p className="text-sm text-muted-foreground">{showMeditationDetails.category}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold">{showMeditationDetails.duration} min</div>
                    <div className="text-xs text-muted-foreground">Duración</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold">{showMeditationDetails.completedDate}</div>
                    <div className="text-xs text-muted-foreground">Completada</div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{showMeditationDetails.description}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmar eliminación de sesión de meditación */}
      <AlertDialog open={meditationToDelete !== null} onOpenChange={() => setMeditationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar sesión completada?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres eliminar esta sesión de meditación del historial?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteMeditationSession}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog para detalles de sueño */}
      <Dialog open={showSleepDetails !== null} onOpenChange={() => setShowSleepDetails(null)}>
        <DialogContent className="max-w-md">
          {showSleepDetails && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-accent" />
                  Registro de Sueño
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <h3 className="font-semibold text-lg">{showSleepDetails.hours}h de sueño</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(showSleepDetails.date).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold">{showSleepDetails.quality}/5</div>
                    <div className="text-xs text-muted-foreground">Calidad</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-bold">{showSleepDetails.hours}h</div>
                    <div className="text-xs text-muted-foreground">Duración</div>
                  </div>
                </div>
                
                {showSleepDetails.note && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Notas:</h4>
                    <p className="text-sm text-muted-foreground">{showSleepDetails.note}</p>
                  </div>
                )}

                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-300">
                  <p className="text-xs text-blue-700 font-medium">
                    💡 {getSleepTip(showSleepDetails.hours, showSleepDetails.quality)}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmar eliminación de registro de sueño */}
      <AlertDialog open={sleepToDelete !== null} onOpenChange={() => setSleepToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar registro de sueño?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres eliminar este registro de sueño?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteSleepEntry}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WellnessModule;