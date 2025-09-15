import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";
interface Props {
  fields: any[];
  append: (value: string) => void;
  remove: (index: number) => void;
  register: any;
}
const SuperpowerInputList = ({ fields, append, remove, register }: Props) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Superpowers</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <Input
            {...register(`superpowers.${index}` as const)}
            placeholder={`Superpower #${index + 1}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => remove(index)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append("")}
        className="flex items-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Add Superpower
      </Button>
    </div>
  );
};

export default SuperpowerInputList;
