import { useState, useRef, useEffect } from 'react';
import './ChipAutocomplete.css';
import { X } from 'lucide-react';

interface ChipAutocompleteProps {
  title: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  className: string;
  suggestions: string[];
}

export function ChipAutocomplete({ 
  title, 
  value, 
  setValue, 
  placeholder, 
  className,
  suggestions 
}: ChipAutocompleteProps) {
  const [chips, setChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [suggestionsPosition, setSuggestionsPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update suggestions position based on input position
  useEffect(() => {
    if (showSuggestions && inputRef.current && containerRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      setSuggestionsPosition({
        top: inputRect.bottom - containerRect.top + 4,
        left: inputRect.left - containerRect.left
      });
    }
  }, [showSuggestions, chips, inputValue]);

  // Initialize chips from value prop
  useEffect(() => {
    if (value && chips.length === 0) {
      const initialChips = value.split(',').map(s => s.trim()).filter(Boolean);
      setChips(initialChips);
    }
  }, [value]);

  // Update parent value when chips change
  useEffect(() => {
    setValue(chips.join(', '));
  }, [chips, setValue]);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
          !chips.includes(suggestion)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    setHighlightedIndex(-1);
  }, [inputValue, chips, suggestions]);

  const addChip = (chipValue: string) => {
    if (chipValue && !chips.includes(chipValue)) {
      setChips([...chips, chipValue]);
      setInputValue('');
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  const removeChip = (indexToRemove: number) => {
    setChips(chips.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      addChip(filteredSuggestions[highlightedIndex]);
    } else if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addChip(inputValue.trim());
    } else if (e.key === 'Backspace' && !inputValue && chips.length > 0) {
      removeChip(chips.length - 1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="chip-autocomplete-wrapper">
      <h2 className="subtitle">{title}</h2>
      <div className="chip-autocomplete-container">
        <div
          ref={containerRef}
          className={`chip-input-box ${className}`}
          onClick={() => inputRef.current?.focus()}
        >
          {chips.map((chip, index) => (
            <div key={index} className="chip">
              <span>{chip}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeChip(index);
                }}
                className="chip-remove"
                aria-label={`Remove ${chip}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={chips.length === 0 ? placeholder : ''}
            className="chip-input"
          />
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="chip-suggestions"
            style={{
              top: `${suggestionsPosition.top}px`,
              left: `${suggestionsPosition.left}px`
            }}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`chip-suggestion-item ${
                  index === highlightedIndex ? 'highlighted' : ''
                }`}
                onClick={() => addChip(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}