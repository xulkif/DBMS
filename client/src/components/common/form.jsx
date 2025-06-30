import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  isLogIN,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;

    const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
          className='text-sm md:text-base'
            name={getControlItem.name}
            readOnly={getControlItem.name === 'foundIn'}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}

            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(selectedValue) =>
              setFormData({
                ...formData,
                [getControlItem.name]: selectedValue,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem 
                      key={optionItem.id} 
                      value={optionItem.value || optionItem.id}
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
 
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  // const display=isLogIN:display:grid ,grid-d
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-2 p-4">
        {formControls.map((controlItem) => (
          <div className="grid grid-cols-2 w-full gap-4" key={controlItem.name}>
            <Label className="mb-1 font-sans font-semibold text-sm dark:text-white md:text-base">
              {controlItem.label}
            </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="mt-10 w-full hover:bg-slate-500"
      >
        {buttonText || "Submit"}
      </Button>
      {isLogIN && (
        <div className="text-center mt-4">
          <Link 
            to="/forgot-password" 
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Forgot Password?
          </Link>
        </div>
      )}
    </form>
  );
}

export default CommonForm;
