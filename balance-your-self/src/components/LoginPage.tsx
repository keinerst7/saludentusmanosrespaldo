import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Eye, EyeOff, Apple, Target, Heart, CheckCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useFetcher } from 'react-router-dom';
import axios from 'axios';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    name: '',
  });

// Obtener listado de usuarios
  useEffect(() => {
    axios.get("http://localhost:3000/api/users")
      .then(res => {
        console.log("Listado de usuarios", res);
      });
  }, []);


  // Función para hacer login
const loginUser = (e) => {
  e.preventDefault();
  axios.post("http://localhost:3000/api/users/login", {
    email: formData.email,
    password: formData.password,
  }).then(res => {
    if (res.data && res.data.user) {
      // Usuario válido, permite acceso
      onLogin(res.data.user.email);
    } else {
      // Usuario no encontrado o credenciales incorrectas
      alert("Correo o contraseña incorrectos. Intenta nuevamente.");
    }
  }).catch(() => {
    alert("Error al iniciar sesión. Verifica tus datos.");
  });
};

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUppercase,
      hasLowercase,
      hasSpecialChar,
      isValid: minLength && hasUppercase && hasLowercase && hasSpecialChar
    };
  };

  const getPasswordValidationMessage = () => {
    const validation = validatePassword(formData.password);
    if (!formData.password) return '';
    
    const requirements = [];
    if (!validation.minLength) requirements.push('8 caracteres');
    if (!validation.hasUppercase) requirements.push('1 mayúscula');
    if (!validation.hasLowercase) requirements.push('1 minúscula');
    if (!validation.hasSpecialChar) requirements.push('1 carácter especial');
    
    return requirements.length > 0 ? `Falta: ${requirements.join(', ')}` : 'Contraseña válida';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      alert('Debes aceptar los términos y condiciones para continuar');
      return;
    }
    
    if (!formData.email || !formData.password) {
      alert('Por favor, completa todos los campos requeridos');
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      alert('La contraseña debe cumplir todos los requisitos de seguridad');
      return;
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      if (!formData.name) {
        alert('Por favor, ingresa tu nombre completo');
        return;
      }
    }

    // Simulación del login/registro
    const username = formData.name || formData.email.split('@')[0];
   onLogin(formData.email);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ECF3F1] to-[#CFE3E1] p-4">
      <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg w-full max-w-md border border-[#76BFAC]/20">
        {/* Logo principal */}
        <div className="text-center mb-8">
          <div className="w-36 h-36 bg-[#FFFFFF] rounded-full flex items-center justify-center shadow-lg mx-auto mb-4 border-2 border-[#CFE3E1]">
            <img 
              src="/public/lovable-uploads/e4c15637-8aff-495d-8a19-a3a1f6c659fa-removebg-preview (2).png"
              alt="Salud en tus Manos"
              className="w-28 h-28 object-contain"
            />
          </div>
        </div>

        {/* Términos y condiciones */}
        {!acceptedTerms && (
          <Card className="shadow-lg border-0 bg-card/95 backdrop-blur mb-6">
            <CardHeader className="txt-center">
              <CardTitle className="text-xl text-foreground">
                Términos y Condiciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Bienvenido a "Salud en tus Manos". Al usar esta aplicación, aceptas:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Usar la aplicación de manera responsable y para fines de bienestar personal</li>
                  <li>Proporcionar información veraz en tus registros de salud</li>
                  <li>Entender que esta app es complementaria y no reemplaza consultas médicas</li>
                  <li>Respetar la privacidad de otros usuarios</li>
                </ul>
              </div>
              <div className="flex items-start space-x-2 pt-4">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-foreground leading-none">
                  Acepto los Términos y Condiciones de la aplicación Salud en tus Manos
                </label>
              </div>
              <Button
                onClick={() => setAcceptedTerms(true)}
                disabled={!acceptedTerms}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Card de login/registro - Solo para usuarios */}
        {acceptedTerms && (
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">
                {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? 'Inicia sesión para acceder a tu dashboard de bienestar'
                  : 'Completa el formulario para crear tu cuenta'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Nombre completo
                    </Label>
                    <p className="text-xs text-muted-foreground mb-1">
                      Ingresa tu nombre y apellidos completos
                    </p>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Tu nombre completo"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm font-medium">
                      Edad
                    </Label>
                    <p className="text-xs text-muted-foreground mb-1">
                      Tu edad en años
                    </p>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Tu edad"
                      min="13"
                      max="120"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo electrónico
                  </Label>
                  <p className="text-xs text-muted-foreground mb-1">
                    Dirección de email válida para acceder a tu cuenta
                  </p>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </Label>
                  <p className="text-xs text-muted-foreground mb-1">
                    Mínimo 8 caracteres con al menos 1 mayúscula, 1 minúscula y 1 carácter especial
                  </p>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tu contraseña"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className={`text-xs mt-1 ${validatePassword(formData.password).isValid ? 'text-green-600' : 'text-amber-600'}`}>
                      {getPasswordValidationMessage()}
                    </div>
                  )}
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirmar contraseña
                    </Label>
                    <p className="text-xs text-muted-foreground mb-1">
                      Repite la contraseña para verificar que coincide
                    </p>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirma tu contraseña"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <div className="text-xs text-red-600 mt-1">
                        Las contraseñas no coinciden
                      </div>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={(e) => loginUser(e)}
                >
                  {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </Button>
              </form>
            </CardContent>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ email: '', password: '', confirmPassword: '', age: '', name: '' });
                }}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                {isLogin 
                  ? '¿No tienes cuenta? Regístrate aquí'
                  : '¿Ya tienes cuenta? Inicia sesión aquí'
                }
              </button>
            </div>

            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 transition-colors underline"
                >
                  ¿Olvidaste tu contraseña? Ingresa aquí
                </button>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Al {isLogin ? 'iniciar sesión' : 'registrarte'}, aceptas nuestros términos de servicio
              </p>
            </div>
          </Card>
        )}

        {/* Cards informativas de módulos */}
        {acceptedTerms && (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                ✨ Conoce nuestros módulos antes de comenzar
              </h3>
              <p className="text-sm text-muted-foreground">
                Descubre todas las herramientas que tenemos para tu bienestar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Módulo Mi Perfil */}
              <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-accent mb-2">👤 Mi Perfil</h4>
                    <p className="text-sm text-muted-foreground">
                      Gestiona tu información personal y celebra tus logros de bienestar y salud.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Módulo Bienestar */}
              <Card className="bg-gradient-to-br from-accent-light/5 to-accent-lighter/10 border-accent-light/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-accent-light/20 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-accent-light" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-accent-light mb-2">🌿 Bienestar</h4>
                    <p className="text-sm text-muted-foreground">
                      Cuida tu salud mental con meditación guiada, registro de estado de ánimo y seguimiento de tu calidad de sueño.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;