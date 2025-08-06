import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Droplets, Plus, Minus } from 'lucide-react';

interface WaterIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (liters: number, milliliters: number) => void;
}

const WaterIntakeModal = ({ isOpen, onClose, onRegister }: WaterIntakeModalProps) => {
  const [liters, setLiters] = useState(0);
  const [milliliters, setMilliliters] = useState(0);

  const quickAmounts = [
    { label: '250ml', ml: 250 },
    { label: '500ml', ml: 500 },
    { label: '1L', ml: 1000 },
    { label: '1.5L', ml: 1500 }
  ];

  const handleQuickAdd = (ml: number) => {
    const totalMl = liters * 1000 + milliliters + ml;
    const newLiters = Math.floor(totalMl / 1000);
    const newMilliliters = totalMl % 1000;
    setLiters(newLiters);
    setMilliliters(newMilliliters);
  };

  const handleSubmit = () => {
    onRegister(liters, milliliters);
    setLiters(0);
    setMilliliters(0);
    onClose();
  };

  const handleReset = () => {
    setLiters(0);
    setMilliliters(0);
  };

  const adjustValue = (type: 'liters' | 'milliliters', increment: boolean) => {
    if (type === 'liters') {
      setLiters(prev => Math.max(0, increment ? prev + 1 : prev - 1));
    } else {
      setMilliliters(prev => {
        const newValue = increment ? prev + 50 : prev - 50;
        return Math.max(0, Math.min(999, newValue));
      });
    }
  };

  const totalMl = liters * 1000 + milliliters;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            Registrar Consumo de Agua
          </DialogTitle>
          <DialogDescription>
            Registra la cantidad de agua que has bebido
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cantidad Manual */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Cantidad Manual</h4>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Litros */}
              <div className="space-y-2">
                <Label htmlFor="liters">Litros</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => adjustValue('liters', false)}
                    disabled={liters === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    id="liters"
                    type="number"
                    min="0"
                    max="10"
                    value={liters}
                    onChange={(e) => setLiters(Math.max(0, parseInt(e.target.value) || 0))}
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => adjustValue('liters', true)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Mililitros */}
              <div className="space-y-2">
                <Label htmlFor="milliliters">Mililitros</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => adjustValue('milliliters', false)}
                    disabled={milliliters === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    id="milliliters"
                    type="number"
                    min="0"
                    max="999"
                    step="50"
                    value={milliliters}
                    onChange={(e) => setMilliliters(Math.max(0, Math.min(999, parseInt(e.target.value) || 0)))}
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => adjustValue('milliliters', true)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Cantidades Rápidas */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Cantidades Rápidas</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAdd(amount.ml)}
                  className="text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {amount.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Total */}
          {totalMl > 0 && (
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-lg font-semibold text-blue-700">
                Total: {liters > 0 && `${liters}L `}{milliliters > 0 && `${milliliters}ml`}
              </div>
              <Badge variant="secondary" className="mt-1">
                {totalMl}ml total
              </Badge>
            </div>
          )}

          {/* Botones de Acción */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={totalMl === 0}
              className="flex-1"
            >
              Limpiar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={totalMl === 0}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              <Droplets className="w-4 h-4 mr-2" />
              Registrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaterIntakeModal;