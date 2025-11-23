import { CONFIDENCE_DETAILS, CONFIDENCE_LEVELS } from '../config/constants';
import type { Confidence } from '../types/fire';

type ConfidenceDetails = {
  text: string;
  color: string;
  mapColor: string;
};

/**
 * Returns display details (text, color) for a given fire confidence level.
 * @param confidence The confidence level ('high', 'medium', 'low').
 * @returns An object with text and color class, or defaults for unknown levels.
 */
export const getConfidenceDetails = (confidence: Confidence): ConfidenceDetails => {
  const level = confidence?.toLowerCase() as Confidence;
  if (level === CONFIDENCE_LEVELS.high) {
    return CONFIDENCE_DETAILS.high;
  }
  if (level === CONFIDENCE_LEVELS.medium) {
    return CONFIDENCE_DETAILS.medium;
  }
  return CONFIDENCE_DETAILS.low; // Default to low
};
