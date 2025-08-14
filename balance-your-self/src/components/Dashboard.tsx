import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Target,
  Calendar,
  Plus,
  Brain,
  TrendingUp,
  Eye,
  Moon,
  Home,
  Smile,
  Award,
  Lightbulb,
  Zap
} from 'lucide-react';

interface DashboardProps {
  onNavigateToModule: (module: string) => void;
}

const Dashboard = ({ onNavigateToModule }: DashboardProps) => {
  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4 lg:px-6">
      {/* Header del Dashboard centrado completamente */}
      <div className="flex justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary flex items-center justify-center gap-2 mb-2">
            <Home className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex-shrink-0" />
            <span className="whitespace-nowrap">¡Bienvenido!</span>
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground">
            Hoy es un gran día para cuidar de ti
          </p>
        </div>
      </div>

      {/* Estadísticas rápidas - responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Meditación */}
        <Card className="bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Meditación</p>
                <p className="text-xl sm:text-2xl font-bold text-accent">5 sesiones</p>
              </div>
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-accent flex-shrink-0 ml-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNavigateToModule('wellness-meditation')}
                className="text-xs border-accent/20 hover:border-accent/40 hover:bg-accent/10 h-8"
              >
                <Plus className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">Iniciar Sesión</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNavigateToModule('wellness-meditation')}
                className="text-xs border-accent/20 hover:border-accent/40 hover:bg-accent/10 h-8"
              >
                <Eye className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">Ver Más</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bienestar */}
        <Card className="bg-gradient-to-r from-secondary/30 to-muted/30 border-secondary/40">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Bienestar</p>
                <p className="text-xl sm:text-2xl font-bold text-accent">Estados de animo</p>
              </div>
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-accent flex-shrink-0 ml-2" />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigateToModule('wellness-mood')}
              className="w-full text-xs border-secondary/40 hover:border-secondary/60 hover:bg-secondary/20 h-8"
            >
              <Heart className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">Registrar Estado</span>
            </Button>
          </CardContent>
        </Card>

        {/* Sueño */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Sueño</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">7.8h</p>
              </div>
              <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0 ml-2" />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigateToModule('wellness-sleep')}
              className="w-full text-xs border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 h-8"
            >
              <Plus className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">Registrar Sueño</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Módulo principal de Bienestar */}
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">
        <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-secondary/30 hover:border-secondary/50 cursor-pointer bg-gradient-to-br from-secondary/10 to-secondary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-32 sm:h-32 bg-secondary/10 rounded-full -translate-y-8 translate-x-8 sm:-translate-y-16 sm:translate-x-16"></div>
          <CardContent className="p-4 sm:p-6 lg:p-8 text-center space-y-4 sm:space-y-6 relative z-10" onClick={() => onNavigateToModule('wellness')}>
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-secondary/40 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-secondary/50 transition-colors shadow-lg">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent mb-2 sm:mb-3">Bienestar</h3>
              <p className="text-sm sm:text-base text-muted-foreground px-2 sm:px-0">
                Control emocional, meditación y registro de sueño
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="text-xs bg-secondary/20 border-secondary/40">💭 Estado Ánimo</Badge>
              <Badge variant="outline" className="text-xs bg-secondary/20 border-secondary/40">🧘 Meditación</Badge>
              <Badge variant="outline" className="text-xs bg-secondary/20 border-secondary/40">💤 Sueño</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mi Perfil como sección separada */}
      <Card className="group hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border-primary/20 hover:border-primary/40 cursor-pointer bg-gradient-to-r from-primary/5 to-primary-light/10"
            onClick={() => onNavigateToModule('profile')}>
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors flex-shrink-0">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">Mi Perfil</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              Información personal y logros de salud
            </p>
            <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
              <Badge variant="outline" className="text-xs">Datos Personales</Badge>
              <Badge variant="outline" className="text-xs">Logros</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mensajes motivacionales */}
      <Card className="bg-gradient-to-r from-accent-light/10 to-accent-lighter/20">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-accent-light flex-shrink-0" />
                <span className="leading-tight">Consejos Motivacionales de Salud</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1">
                Mensajes diarios para inspirar tus buenos hábitos
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-card self-start sm:self-auto">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Hoy
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Actitud Positiva */}
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-lg border border-green-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Smile className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2" />
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-green-600 mb-2">Actitud Positiva</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "Una actitud positiva es la clave para una vida saludable. Cada día es una oportunidad para mejorar."
              </p>
            </div>
            
            {/* Mente Clara */}
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-lg border border-blue-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-blue-600 mb-2">Mente Clara</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "La meditación es como ejercicio para la mente. Fortalece tu capacidad de concentración y paz interior."
              </p>
            </div>
            
            {/* Descanso Reparador */}
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-lg border border-purple-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mr-2" />
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-purple-600 mb-2">Descanso Reparador</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "Un buen descanso nocturno es la base de un día productivo. Tu cuerpo se regenera mientras duermes."
              </p>
            </div>
            
            {/* Progreso Constante */}
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-orange-500/5 to-orange-500/10 rounded-lg border border-orange-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mr-2" />
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-orange-600 mb-2">Progreso Constante</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "Pequeños pasos diarios llevan a grandes cambios. La constancia es más importante que la perfección."
              </p>
            </div>
            
            {/* Autocuidado */}
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-pink-500/5 to-pink-500/10 rounded-lg border border-pink-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 mr-2" />
                <Smile className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-pink-600 mb-2">Autocuidado</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "Cuidar de ti mismo no es egoísmo, es necesario. Eres tu prioridad número uno."
              </p>
            </div>
            
            {/* Hábitos Saludables */}
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 rounded-lg border border-cyan-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 mr-2" />
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-cyan-600 mb-2">Hábitos Saludables</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "Los hábitos saludables son inversiones en tu futuro. Cada buena decisión cuenta."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;