"use client";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const StatPointAllocation = () => {
  const totalPoints = 500; // Total stat points available
  const [attack, setAttack] = useState(0);
  const [defence, setDefence] = useState(0);
  const [hitpoints, setHitpoints] = useState(0);
  const [remainingPoints, setRemainingPoints] = useState(totalPoints);

  useEffect(() => {
    // Calculate remaining points after state updates
    const allocatedPoints = attack + defence + hitpoints;

    setRemainingPoints(totalPoints - allocatedPoints);
  }, [attack, defence, hitpoints, remainingPoints]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const statName = e.target.name;
    const newValue = parseInt(e.target.value);

    // Check if the new value is within the allowable range (0 to totalPoints)
    if (newValue >= 0 && newValue <= totalPoints) {
      // Update the corresponding state based on the statName
      switch (statName) {
        case "attack":
          setAttack(newValue);
          break;
        case "defence":
          setDefence(newValue);
          break;
        case "hitpoints":
          setHitpoints(newValue);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      <div>
        <Label htmlFor="attack">Attack</Label>
        <Input
          type="number"
          value={attack}
          name="attack"
          onChange={handleInputChange}
          placeholder="Attack"
        />
      </div>
      <div>
        <Label htmlFor="defence">Defence</Label>
        <Input
          type="number"
          value={defence}
          name="defence"
          onChange={handleInputChange}
          placeholder="Defence"
        />
      </div>
      <div>
        <Label htmlFor="hitpoints">Hitpoints</Label>
        <Input
          type="number"
          value={hitpoints}
          name="hitpoints"
          onChange={handleInputChange}
          placeholder="Hitpoints"
        />
      </div>
      <div>
        <span
          className={remainingPoints < 0 ? "text-red-600" : "text-green-600"}
        >
          Remaining Points: {remainingPoints}
        </span>
      </div>
    </div>
  );
};

export default StatPointAllocation;
