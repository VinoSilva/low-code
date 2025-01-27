// Import libraries
import { useEffect, useState } from "react";

// Import components
import Input from "./Input";

interface DebouncedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  debounceTime?: number; // Time in milliseconds
  onDebouncedChange?: (value: string) => void; // Callback for debounced value
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  debounceTime = 300, // Default debounce time
  onDebouncedChange,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(props.value || ""); // Track input value
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e); // Call the original onChange if provided
    }
  };

  // Debounce logic: update debouncedValue after the specified delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, debounceTime);

    return () => {
      clearTimeout(handler); // Cleanup timeout on value or delay change
    };
  }, [inputValue, debounceTime]);

  // Call the debounced callback when debouncedValue changes
  useEffect(() => {
    if (onDebouncedChange) {
      onDebouncedChange(debouncedValue as string);
    }
  }, [debouncedValue, onDebouncedChange]);

  return <Input {...props} value={inputValue} onChange={handleChange} />;
};

export default DebouncedInput;
