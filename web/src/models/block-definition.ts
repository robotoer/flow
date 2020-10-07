import { Audited } from "./audited";

export type BlockDefinition = TextQuestionBlockDefinition | OptionsQuestionBlockDefinition | PlateSamplerBlockDefinition | PlateAddReagentBlockDefinition | PlateSequencerBlockDefinition;

export interface TextQuestionBlockDefinition extends Audited {
    type: 'text-question';

    id?: number;
    name?: string;
    question?: string;
}

export interface OptionsQuestionBlockDefinition extends Audited {
    type: 'options-question';

    id?: number;
    name?: string;
    question?: string;
    optionType?: 'switch' | 'checkbox' | 'radio' | 'menu-item' | 'user';
    options?: string[];
}

export interface PlateSamplerBlockDefinition extends Audited {
    type: 'plate-sampler';

    id?: number;
    name?: string;
    plateCount?: number;
    plateSize?: 96;
}

export interface PlateAddReagentBlockDefinition extends Audited {
    type: 'plate-add-reagent';

    id?: number;
    name?: string;
    plateSize?: 96 | 384;
    reagentId?: number;
}

export interface PlateSequencerBlockDefinition extends Audited {
    type: 'plate-sequencer';

    id?: number;
    name?: string;
    plateSize?: 96 | 384;
}
