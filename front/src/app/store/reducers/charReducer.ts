import { createReducer, on } from "@ngrx/store";

import { saveChar, submitChar, submitCharError, submitCharSuccess } from "../actions/charActions";
import { charSaveStatuses, charState } from "../../types/storeTypes";
import { formEnum } from "src/app/types/gameTypes";

const initialState: charState = {
  loading: false,
  error: false,
  statuses: {
    appearanceSaved: false,
    statsSaved: false,
    itemsSaved: false
  },
  character: {
    name: '',
    raceId: 1,
    height: 0,
    weight: 0,
    strength: 0,
    agility: 0,
    endurance: 0,
    speed: 0,
    armorId: 1,
    weaponId: 1,
    damage: {
      minDamage: 0,
      maxDamage: 0
    },
    dodgeChanse: 0,
    health: 0,
    hitChanse: 0,
    initiative: 0,
    mitigation: 0
  },
  rating: 0
};

const switchSaveStatuses = (type: formEnum, statuses: charSaveStatuses) => {
  switch (type) {
    case formEnum.appearance: {
      return {
        ...statuses,
        appearanceSaved: true
      }
    }
    case formEnum.stats: {
      return {
        ...statuses,
        statsSaved: true
      }
    }
    case formEnum.items: {
      return {
        ...statuses,
        itemsSaved: true
      }
    }
  }
}

export const charReducer = createReducer(
  initialState,
  on(saveChar, (state: charState, action) => ({
    ...state,
    statuses: switchSaveStatuses(action.data.formType, state.statuses),
    character: {
      ...state.character,
      ...action.data.formData
    }
  })),
  on(submitCharError, (state: charState) => ({
    ...state,
    loading: false,
    error: true
  })),
  on(submitChar, (state: charState) => ({
    ...state,
    loading: true
  })),
  on(submitCharSuccess, (state: charState, action) => ({
    ...state,
    loading: false,
  })),
)