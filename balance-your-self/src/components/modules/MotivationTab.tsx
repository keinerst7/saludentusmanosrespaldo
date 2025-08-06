import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Lightbulb, Star, Sunrise, Leaf } from 'lucide-react';

const MotivationTab = () => {
  const motivationalQuotes = [
    {
      id: 1,
      category: "Frase del día",
      quote: "Cada día es una nueva oportunidad para ser la mejor versión de ti mismo",
      icon: <Sunrise className="w-5 h-5" />,
      color: "from-orange-500/10 to-yellow-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      id: 2,
      category: "Nutrición",
      quote: "Alimenta tu cuerpo con amor, nutrición y gratitud. Cada comida es un acto de autocuidado",
      icon: <Leaf className="w-5 h-5" />,
      color: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20"
    },
    {
      id: 3,
      category: "Bienestar Emocional",
      quote: "Tus emociones son válidas. Permítete sentir, pero no olvides que también tienes el poder de elegir cómo responder",
      icon: <Heart className="w-5 h-5" />,
      color: "from-pink-500/10 to-rose-500/10",
      borderColor: "border-pink-500/20"
    },
    {
      id: 4,
      category: "Motivación Personal",
      quote: "No se trata de ser perfecto, se trata de ser constante. Cada pequeño paso cuenta hacia tu bienestar",
      icon: <Star className="w-5 h-5" />,
      color: "from-purple-500/10 to-violet-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      id: 5,
      category: "Sabiduría del día",
      quote: "El cuerpo logra lo que la mente cree. Cultiva pensamientos positivos para una vida plena",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      id: 6,
      category: "Autocuidado",
      quote: "Cuidar de ti mismo no es egoísmo, es responsabilidad. Mereces amor, empezando por el tuyo propio",
      icon: <Heart className="w-5 h-5" />,
      color: "from-accent/10 to-accent-light/10",
      borderColor: "border-accent/20"
    },
    {
      id: 7,
      category: "Crecimiento Personal",
      quote: "Cada desafío es una oportunidad disfrazada. Confía en tu capacidad de adaptarte y crecer",
      icon: <Star className="w-5 h-5" />,
      color: "from-indigo-500/10 to-purple-500/10",
      borderColor: "border-indigo-500/20"
    },
    {
      id: 8,
      category: "Mindfulness",
      quote: "Respira profundo. En este momento, en este lugar, todo está bien. Tu paz interior es tu superpoder",
      icon: <Leaf className="w-5 h-5" />,
      color: "from-teal-500/10 to-green-500/10",
      borderColor: "border-teal-500/20"
    },
    {
      id: 9,
      category: "Hidratación Consciente",
      quote: "Cada vaso de agua es un regalo para tu cuerpo. Hidrátate con intención y gratitud",
      icon: <Leaf className="w-5 h-5" />,
      color: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      id: 10,
      category: "Descanso Reparador",
      quote: "Dormir bien no es tiempo perdido, es una inversión en tu energía del mañana",
      icon: <Star className="w-5 h-5" />,
      color: "from-indigo-500/10 to-blue-500/10",
      borderColor: "border-indigo-500/20"
    },
    {
      id: 11,
      category: "Alimentación Consciente",
      quote: "Come el arcoíris: cada color en tu plato aporta diferentes nutrientes esenciales para tu bienestar",
      icon: <Leaf className="w-5 h-5" />,
      color: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-500/20"
    },
    {
      id: 12,
      category: "Fortaleza Mental",
      quote: "Eres más resiliente de lo que crees y más capaz de superar desafíos de lo que imaginas",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      id: 13,
      category: "Gratitud Diaria",
      quote: "La gratitud transforma lo ordinario en extraordinario. Encuentra algo hermoso en tu día de hoy",
      icon: <Heart className="w-5 h-5" />,
      color: "from-pink-500/10 to-purple-500/10",
      borderColor: "border-pink-500/20"
    },
    {
      id: 14,
      category: "Equilibrio Vital",
      quote: "Tu salud mental es tan importante como tu salud física. Honra y cuida ambas con amor",
      icon: <Star className="w-5 h-5" />,
      color: "from-violet-500/10 to-purple-500/10",
      borderColor: "border-violet-500/20"
    },
    {
      id: 15,
      category: "Progreso Personal",
      quote: "El progreso no es perfección, es constancia. Cada pequeño paso te acerca a tu mejor versión",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "from-amber-500/10 to-yellow-500/10",
      borderColor: "border-amber-500/20"
    },
    {
      id: 16,
      category: "Transformación Nutricional",
      quote: "Pequeños cambios en tu alimentación pueden crear grandes transformaciones en tu energía y vitalidad",
      icon: <Leaf className="w-5 h-5" />,
      color: "from-lime-500/10 to-green-500/10",
      borderColor: "border-lime-500/20"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-primary">Motivación Diaria</h3>
        <p className="text-muted-foreground">
          Encuentra inspiración y consejos para acompañarte en tu jornada de bienestar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {motivationalQuotes.map((item) => (
          <Card key={item.id} className={`bg-gradient-to-br ${item.color} ${item.borderColor} hover:shadow-md transition-all duration-300`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                {item.icon}
                {item.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-sm leading-relaxed italic">
                "{item.quote}"
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Consejo especial del día */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <Star className="w-6 h-6 text-primary" />
            Consejo Especial del Día
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg font-medium text-primary mb-3">
            "Recuerda que tu bienestar es un viaje, no un destino"
          </p>
          <p className="text-sm text-muted-foreground">
            Celebra cada pequeño logro en tu camino hacia una vida más saludable y plena. 
            Tu constancia de hoy es la base de tu bienestar de mañana.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotivationTab;