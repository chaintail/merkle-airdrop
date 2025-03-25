"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SnowflakeIcon } from "./icons/snow-flake"
import { PumpkinIcon } from "./icons/pumpkin"
import { BalloonIcon } from "./icons/balloon"
import { Clover, Heart, Cake, PartyPopper } from "lucide-react"
import type { EffectType } from "./FallingParticles"
import { PARTICLE_COLOURS } from "./falling-particle"

interface EffectFabProps {
  handleToggle: () => void
  effectType: EffectType
  isActive: boolean
  zIndex?: number
}

const getButtonColors = (effectType: EffectType) => {
  let activeColor = PARTICLE_COLOURS["white"]
  let inactiveColor = PARTICLE_COLOURS["lightGrey"]
  switch (effectType) {
    case "snow":
      activeColor = PARTICLE_COLOURS["white"]
      inactiveColor = PARTICLE_COLOURS["lightGrey"]
      break
    case "birthday":
      activeColor = PARTICLE_COLOURS["green"]
      inactiveColor = PARTICLE_COLOURS["darkGreen"]
      break
    case "confetti":
    case "party":
      activeColor = PARTICLE_COLOURS["yellow"]
      inactiveColor = PARTICLE_COLOURS["orange2"]
      break
    case "heart":
      activeColor = PARTICLE_COLOURS["lightPink"]
      inactiveColor = PARTICLE_COLOURS["darkPink"]
      break
    case "shamrock":
      activeColor = PARTICLE_COLOURS["green3"]
      inactiveColor = PARTICLE_COLOURS["darkGreen"]
      break
    case "pumpkin":
      activeColor = PARTICLE_COLOURS["yellow"]
      inactiveColor = PARTICLE_COLOURS["orange"]
      break
    case "balloon":
      activeColor = PARTICLE_COLOURS["green"]
      inactiveColor = PARTICLE_COLOURS["darkPurple"]
      break
  }
  return { activeColor, inactiveColor }
}

const getIconColors = (effectType: EffectType) => {
  let activeFill = PARTICLE_COLOURS["darkGrey"]
  let activeStroke = PARTICLE_COLOURS["lightGrey"]
  let inactiveFill = PARTICLE_COLOURS["lightGrey"]
  let inactiveStroke = PARTICLE_COLOURS["darkGrey"]
  switch (effectType) {
    case "snow":
      activeFill = PARTICLE_COLOURS["white"]
      activeStroke = PARTICLE_COLOURS["lightGrey"]
      inactiveFill = PARTICLE_COLOURS["lightGrey"]
      inactiveStroke = PARTICLE_COLOURS["darkGrey"]
      break
    case "birthday":
      activeFill = PARTICLE_COLOURS["yellow"]
      activeStroke = PARTICLE_COLOURS["darkPink"]
      inactiveFill = PARTICLE_COLOURS["darkBlue"]
      inactiveStroke = PARTICLE_COLOURS["darkRed"]
      break
    case "confetti":
    case "party":
      activeFill = PARTICLE_COLOURS["pink"]
      activeStroke = PARTICLE_COLOURS["purple"]
      inactiveFill = PARTICLE_COLOURS["darkPink"]
      inactiveStroke = PARTICLE_COLOURS["darkBlue"]
      break
    case "heart":
      activeFill = PARTICLE_COLOURS["pink3"]
      activeStroke = PARTICLE_COLOURS["pink"]
      inactiveFill = PARTICLE_COLOURS["pink"]
      inactiveStroke = PARTICLE_COLOURS["darkRed"]
      break
    case "shamrock":
      activeFill = `${PARTICLE_COLOURS["darkGreen"]}aa`
      activeStroke = PARTICLE_COLOURS["green4"]
      inactiveFill = `${PARTICLE_COLOURS["green"]}99`
      inactiveStroke = PARTICLE_COLOURS["green4"]
      break
    case "pumpkin":
      activeFill = PARTICLE_COLOURS["orange2"]
      activeStroke = PARTICLE_COLOURS["darkGrey"]
      inactiveFill = PARTICLE_COLOURS["orange2"]
      inactiveStroke = PARTICLE_COLOURS["darkGrey"]
      break
    case "balloon":
      activeFill = PARTICLE_COLOURS["red"]
      activeStroke = PARTICLE_COLOURS["darkBlue"]
      inactiveFill = PARTICLE_COLOURS["blue"]
      inactiveStroke = PARTICLE_COLOURS["blue"]
      break
    default:
      activeFill = PARTICLE_COLOURS["darkGrey"]
      activeStroke = PARTICLE_COLOURS["lightGrey"]
      inactiveFill = PARTICLE_COLOURS["lightGrey"]
      inactiveStroke = PARTICLE_COLOURS["darkGrey"]
      break
  }
  return { activeFill, activeStroke, inactiveFill, inactiveStroke }
}

const EffectFab: React.FC<EffectFabProps> = ({ handleToggle, effectType = "snow", isActive, zIndex = 9 }) => {
  const { activeColor, inactiveColor } = getButtonColors(effectType)
  const { activeFill, activeStroke, inactiveFill, inactiveStroke } = getIconColors(effectType)

  const buttonColor = isActive ? activeColor : inactiveColor
  const iconColor = isActive ? activeFill : inactiveFill
  const iconStroke = isActive ? activeStroke : inactiveStroke

  const iconStyle = {
    width: "28px",
    height: "28px",
    transition: "opacity 0.3s",
    strokeWidth: 1.5,
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        opacity: isActive ? 1 : 0.69,
        zIndex,
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleToggle}
              size="icon"
              className="h-10 w-10 rounded-full p-0"
              style={{
                backgroundColor: buttonColor,
                border: "3px solid currentColor",
                position: "relative",
              }}
            >
              {/* Button Icon */}
              {effectType === "snow" && <SnowflakeIcon fill={iconColor} stroke={iconStroke} style={iconStyle} />}
              {effectType === "heart" && <Heart fill={iconColor} stroke={iconStroke} style={iconStyle} />}
              {effectType === "shamrock" && <Clover fill={iconColor} stroke={iconStroke} style={iconStyle} />}
              {effectType === "birthday" && (
                <Cake stroke={iconStroke} fill={iconColor} style={{ ...iconStyle, marginTop: "-2px" }} />
              )}
              {(effectType === "confetti" || effectType === "party") && (
                <PartyPopper
                  stroke={iconStroke}
                  fill={iconColor}
                  style={{ ...iconStyle, width: "24px", height: "24px" }}
                />
              )}
              {effectType === "pumpkin" && <PumpkinIcon fill={iconColor} stroke={iconStroke} style={iconStyle} />}
              {effectType === "balloon" && <BalloonIcon fill={iconColor} stroke={iconStroke} style={iconStyle} />}

              {/* Diagonal slash */}
              {!isActive && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "currentColor",
                      transform: "translate(-50%, -50%) rotate(45deg)",
                      borderRadius: "9999px",
                    }}
                  />
                </div>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {isActive ? `Disable ${effectType} effect` : `Enable ${effectType} effect`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default EffectFab

