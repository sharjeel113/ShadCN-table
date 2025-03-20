
import { useState, useEffect } from "react";

interface BreedAttributes {
  name: string;
  description: string;
  hypoallergenic: boolean;
  life: {
    min: number;
    max: number;
  };
  male_weight: {
    min: number;
    max: number;
  };
  female_weight: {
    min: number;
    max: number;
  };
}

interface Breed {
  id: string;
  attributes: BreedAttributes;
}

export function useBreeds() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBreeds = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dogapi.dog/api/v2/breeds");
      const data = await response.json();
      setBreeds(data.data as Breed[]);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  return { breeds, loading, fetchBreeds };
}
