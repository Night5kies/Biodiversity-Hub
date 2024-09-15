'use client';
import * as React from "react";
import SpeciesCard from "./species-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export function SortedSpecies({id,species, profiles}: {id: string,
  species: {
    author: string;
    common_name: string | null;
    description: string | null;
    id: number;
    image: string | null;
    kingdom: "Animalia" | "Plantae" | "Fungi" | "Protista" | "Archaea" | "Bacteria";
    scientific_name: string;
    total_population: number | null;
    endangered: boolean;}[],
  profiles: {
    biography: string | null;
    display_name: string;
    email: string;
    id: string;
  }[]
  }) {

  const [sortDir, setSort] = React.useState<boolean>(true); // true = sort A-Z, false = sort Z-A
  const [search, setSearch] = React.useState<string>("");

  return (
    <>
      <div className="flex flex-wrap justify-center">

        {/* SCIENTIFIC NAME ALPHABETICAL SORT */}

        <Button  onClick={()=>{setSort(!sortDir);}}> {sortDir ? "A-Z" : "Z-A"} </Button>

        {/* SEARCH BAR */}

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search for Species" onChangeCapture={e=>setSearch(e.currentTarget.value.toLowerCase())}/>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {species?.filter((speciesTemp) =>
            ((speciesTemp.common_name ? speciesTemp.common_name.toLowerCase().includes(search) : false) //SEARCH
              || (speciesTemp.description ? speciesTemp.description.toLowerCase().includes(search) : false)
              || (speciesTemp.scientific_name ? speciesTemp.scientific_name.toLowerCase().includes(search) : false))
          ).sort(function (a,b) { // SORT ALPHABETICALLY
          if (sortDir){
            if (a.scientific_name < b.scientific_name) {return -1;}
            if (a.scientific_name > b.scientific_name) {return 1;}
            return 0;
          }
          else{
            if (a.scientific_name < b.scientific_name) {return 1;}
            if (a.scientific_name > b.scientific_name) {return -1;}
            return 0;
          }
        }).map((species) => <SpeciesCard key={species.id} species={species} userId={id} profiles={profiles}/>)}
      </div>
    </>
  )
}
