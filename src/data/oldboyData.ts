// ================================================================
// OLDBOY HALLWAY FIGHT SCENE - SURVEILLANCE ANALYSIS DATA
// Primary Dataset Case Study for B.Tech Thesis
// "Prediction of Mob Violence Scene Using Surveillance Data"
// ================================================================

export interface Actor {
  id: string;
  name: string;
  role: string;
  label: string;
  weapon: string;
  weaponType: 'blunt' | 'edged' | 'none';
  behavior: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  boundingBox: { x: number; y: number; w: number; h: number };
  skeletalStatus: string;
  isActive: boolean;
}

export interface ViolenceEvent {
  id: number;
  timestamp: string;
  frameRange: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  involvedActors: string[];
  weaponsUsed: string[];
  captionText: string;
}

export interface Prediction {
  timestamp: string;
  actor: string;
  currentAction: string;
  predictedNextMove: string;
  confidence: number;
  lstmOutput: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  reasoning: string;
}

export interface Caption {
  timestamp: string;
  frameNum: number;
  text: string;
  type: 'violence' | 'weapon' | 'movement' | 'prediction' | 'status';
}

// ================================================================
// ACTORS - Oh Dae-su + ~30 Mob Opponents
// ================================================================
export const actors: Actor[] = [
  {
    id: 'ACTOR-01',
    name: 'Oh Dae-su',
    role: 'Protagonist (Attacker/Victim)',
    label: 'Protagonist — Primary Combatant',
    weapon: 'Claw Hammer',
    weaponType: 'blunt',
    behavior: 'Aggressive / Striking / Defensive Stance',
    threatLevel: 'critical',
    confidence: 0.97,
    boundingBox: { x: 45, y: 25, w: 8, h: 22 },
    skeletalStatus: 'Active — Fatigue Building',
    isActive: true,
  },
  {
    id: 'ACTOR-02',
    name: 'Thug Leader',
    role: 'Mob Leader / Instigator',
    label: 'Aggressor — Mob Instigator',
    weapon: 'Wooden Stick',
    weaponType: 'blunt',
    behavior: 'Directing / Commanding / Aggressive',
    threatLevel: 'critical',
    confidence: 0.94,
    boundingBox: { x: 62, y: 28, w: 7, h: 20 },
    skeletalStatus: 'Active — Coordinating Attack',
    isActive: true,
  },
  {
    id: 'ACTOR-03',
    name: 'Mob Member #1',
    role: 'Aggressor',
    label: 'Active Participant — Front Line',
    weapon: 'Wooden Stick',
    weaponType: 'blunt',
    behavior: 'Charging / Striking',
    threatLevel: 'high',
    confidence: 0.91,
    boundingBox: { x: 55, y: 30, w: 7, h: 19 },
    skeletalStatus: 'Active — Engaged',
    isActive: true,
  },
  {
    id: 'ACTOR-04',
    name: 'Mob Member #2',
    role: 'Aggressor',
    label: 'Active Participant — Front Line',
    weapon: 'Knife',
    weaponType: 'edged',
    behavior: 'Slashing / Advancing',
    threatLevel: 'critical',
    confidence: 0.89,
    boundingBox: { x: 68, y: 26, w: 6, h: 20 },
    skeletalStatus: 'Active — Aggressive Posture',
    isActive: true,
  },
  {
    id: 'ACTOR-05',
    name: 'Mob Member #3',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'Wooden Stick',
    weaponType: 'blunt',
    behavior: 'Flanking / Waiting',
    threatLevel: 'high',
    confidence: 0.87,
    boundingBox: { x: 72, y: 32, w: 6, h: 18 },
    skeletalStatus: 'Active — Flanking Position',
    isActive: true,
  },
  {
    id: 'ACTOR-06',
    name: 'Mob Member #4',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Punching / Grappling',
    threatLevel: 'medium',
    confidence: 0.85,
    boundingBox: { x: 58, y: 35, w: 6, h: 18 },
    skeletalStatus: 'Active — Close Combat',
    isActive: true,
  },
  {
    id: 'ACTOR-07',
    name: 'Mob Member #5',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'Wooden Stick',
    weaponType: 'blunt',
    behavior: 'Striking from behind',
    threatLevel: 'high',
    confidence: 0.83,
    boundingBox: { x: 38, y: 30, w: 6, h: 19 },
    skeletalStatus: 'Active — Rear Attack',
    isActive: true,
  },
  {
    id: 'ACTOR-08',
    name: 'Mob Member #6',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'Knife',
    weaponType: 'edged',
    behavior: 'Stabbing Motion / Aggressive',
    threatLevel: 'critical',
    confidence: 0.86,
    boundingBox: { x: 75, y: 29, w: 6, h: 19 },
    skeletalStatus: 'Active — Armed & Dangerous',
    isActive: true,
  },
  {
    id: 'ACTOR-09',
    name: 'Mob Member #7',
    role: 'Aggressor',
    label: 'Active Participant — Second Wave',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Kicking / Blocking Exit',
    threatLevel: 'medium',
    confidence: 0.82,
    boundingBox: { x: 80, y: 31, w: 6, h: 18 },
    skeletalStatus: 'Active — Blocking',
    isActive: true,
  },
  {
    id: 'ACTOR-10',
    name: 'Mob Member #8',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'Wooden Stick',
    weaponType: 'blunt',
    behavior: 'Swinging / Retreating',
    threatLevel: 'high',
    confidence: 0.80,
    boundingBox: { x: 82, y: 27, w: 6, h: 19 },
    skeletalStatus: 'Active — Swinging',
    isActive: true,
  },
  {
    id: 'ACTOR-11',
    name: 'Mob Member #9',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Pushing / Shoving',
    threatLevel: 'medium',
    confidence: 0.79,
    boundingBox: { x: 85, y: 33, w: 5, h: 17 },
    skeletalStatus: 'Active — Physical Contact',
    isActive: true,
  },
  {
    id: 'ACTOR-12',
    name: 'Mob Member #10',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'Wooden Stick',
    weaponType: 'blunt',
    behavior: 'Swinging Overhead',
    threatLevel: 'high',
    confidence: 0.81,
    boundingBox: { x: 70, y: 24, w: 6, h: 20 },
    skeletalStatus: 'Active — Overhead Strike',
    isActive: true,
  },
  {
    id: 'ACTOR-13',
    name: 'Mob Member #11',
    role: 'Aggressor',
    label: 'Active Participant — Rear Guard',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Waiting / Ready to Engage',
    threatLevel: 'medium',
    confidence: 0.77,
    boundingBox: { x: 88, y: 30, w: 5, h: 17 },
    skeletalStatus: 'Idle — Waiting',
    isActive: false,
  },
  {
    id: 'ACTOR-14',
    name: 'Mob Member #12',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'Knife',
    weaponType: 'edged',
    behavior: 'Circling / Threat Display',
    threatLevel: 'critical',
    confidence: 0.84,
    boundingBox: { x: 65, y: 35, w: 5, h: 18 },
    skeletalStatus: 'Active — Circling',
    isActive: true,
  },
  {
    id: 'ACTOR-15',
    name: 'Mob Member #13',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'Wooden Stick',
    weaponType: 'blunt',
    behavior: 'Jabbing / Poking',
    threatLevel: 'high',
    confidence: 0.78,
    boundingBox: { x: 52, y: 28, w: 5, h: 18 },
    skeletalStatus: 'Active — Jabbing',
    isActive: true,
  },
  {
    id: 'ACTOR-16',
    name: 'Mob Member #14',
    role: 'Aggressor',
    label: 'Active Participant — Second Wave',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Rushing / Tackling',
    threatLevel: 'medium',
    confidence: 0.76,
    boundingBox: { x: 78, y: 34, w: 5, h: 17 },
    skeletalStatus: 'Active — Rushing',
    isActive: true,
  },
  {
    id: 'ACTOR-17',
    name: 'Mob Member #15',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'Wooden Stick',
    weaponType: 'blunt',
    behavior: 'Overhead Strike',
    threatLevel: 'high',
    confidence: 0.80,
    boundingBox: { x: 60, y: 22, w: 6, h: 20 },
    skeletalStatus: 'Active — Striking',
    isActive: true,
  },
  {
    id: 'ACTOR-18',
    name: 'Mob Member #16',
    role: 'Aggressor',
    label: 'Rear Guard',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Observing / Waiting',
    threatLevel: 'low',
    confidence: 0.73,
    boundingBox: { x: 90, y: 29, w: 5, h: 17 },
    skeletalStatus: 'Idle — Observing',
    isActive: false,
  },
  {
    id: 'ACTOR-19',
    name: 'Mob Member #17',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'Wooden Stick',
    weaponType: 'blunt',
    behavior: 'Swinging Low',
    threatLevel: 'high',
    confidence: 0.79,
    boundingBox: { x: 48, y: 36, w: 5, h: 17 },
    skeletalStatus: 'Active — Low Attack',
    isActive: true,
  },
  {
    id: 'ACTOR-20',
    name: 'Mob Member #18',
    role: 'Aggressor',
    label: 'Active Participant',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Grappling / Holding',
    threatLevel: 'medium',
    confidence: 0.75,
    boundingBox: { x: 42, y: 32, w: 5, h: 18 },
    skeletalStatus: 'Active — Grappling',
    isActive: true,
  },
  {
    id: 'ACTOR-21', name: 'Mob Member #19', role: 'Aggressor', label: 'Second Wave', weapon: 'Wooden Stick', weaponType: 'blunt', behavior: 'Advancing', threatLevel: 'high', confidence: 0.77, boundingBox: { x: 83, y: 26, w: 5, h: 18 }, skeletalStatus: 'Active', isActive: true,
  },
  {
    id: 'ACTOR-22', name: 'Mob Member #20', role: 'Aggressor', label: 'Second Wave', weapon: 'None', weaponType: 'none', behavior: 'Blocking Path', threatLevel: 'medium', confidence: 0.74, boundingBox: { x: 87, y: 33, w: 5, h: 17 }, skeletalStatus: 'Active', isActive: true,
  },
  {
    id: 'ACTOR-23', name: 'Mob Member #21', role: 'Aggressor', label: 'Rear Guard', weapon: 'Knife', weaponType: 'edged', behavior: 'Waiting Armed', threatLevel: 'critical', confidence: 0.82, boundingBox: { x: 91, y: 28, w: 5, h: 18 }, skeletalStatus: 'Idle — Armed Wait', isActive: false,
  },
  {
    id: 'ACTOR-24', name: 'Mob Member #22', role: 'Aggressor', label: 'Active Participant', weapon: 'Wooden Stick', weaponType: 'blunt', behavior: 'Side Attack', threatLevel: 'high', confidence: 0.76, boundingBox: { x: 50, y: 38, w: 5, h: 16 }, skeletalStatus: 'Active', isActive: true,
  },
  {
    id: 'ACTOR-25', name: 'Mob Member #23', role: 'Aggressor', label: 'Active Participant', weapon: 'None', weaponType: 'none', behavior: 'Kicking', threatLevel: 'medium', confidence: 0.73, boundingBox: { x: 56, y: 37, w: 5, h: 16 }, skeletalStatus: 'Active', isActive: true,
  },
  {
    id: 'ACTOR-26', name: 'Mob Member #24', role: 'Aggressor', label: 'Second Wave', weapon: 'Wooden Stick', weaponType: 'blunt', behavior: 'Approaching', threatLevel: 'high', confidence: 0.75, boundingBox: { x: 86, y: 25, w: 5, h: 18 }, skeletalStatus: 'Active', isActive: true,
  },
  {
    id: 'ACTOR-27', name: 'Mob Member #25', role: 'Aggressor', label: 'Rear Guard', weapon: 'None', weaponType: 'none', behavior: 'Observing', threatLevel: 'low', confidence: 0.71, boundingBox: { x: 93, y: 31, w: 4, h: 16 }, skeletalStatus: 'Idle', isActive: false,
  },
  {
    id: 'ACTOR-28', name: 'Mob Member #26', role: 'Aggressor', label: 'Active Participant', weapon: 'Wooden Stick', weaponType: 'blunt', behavior: 'Swinging Wildly', threatLevel: 'high', confidence: 0.78, boundingBox: { x: 63, y: 38, w: 5, h: 16 }, skeletalStatus: 'Active', isActive: true,
  },
  {
    id: 'ACTOR-29', name: 'Mob Member #27', role: 'Aggressor', label: 'Active Participant', weapon: 'None', weaponType: 'none', behavior: 'Punching', threatLevel: 'medium', confidence: 0.72, boundingBox: { x: 40, y: 34, w: 5, h: 17 }, skeletalStatus: 'Active', isActive: true,
  },
  {
    id: 'ACTOR-30', name: 'Mob Member #28', role: 'Aggressor', label: 'Second Wave', weapon: 'Knife', weaponType: 'edged', behavior: 'Slashing', threatLevel: 'critical', confidence: 0.80, boundingBox: { x: 76, y: 36, w: 5, h: 17 }, skeletalStatus: 'Active — Armed', isActive: true,
  },
  {
    id: 'ACTOR-31', name: 'Mob Member #29', role: 'Aggressor', label: 'Rear Guard', weapon: 'Wooden Stick', weaponType: 'blunt', behavior: 'Standing Ready', threatLevel: 'high', confidence: 0.74, boundingBox: { x: 92, y: 35, w: 4, h: 16 }, skeletalStatus: 'Idle — Ready', isActive: false,
  },
];

// ================================================================
// VIOLENCE EVENTS TIMELINE
// ================================================================
export const violenceEvents: ViolenceEvent[] = [
  {
    id: 1,
    timestamp: '00:00 — 00:08',
    frameRange: 'F0001 — F0240',
    type: 'Initial Encounter / Blocking',
    severity: 'medium',
    description: 'Oh Dae-su enters the narrow corridor. The mob blocks the hallway ahead. Tension escalates as both sides assess each other. Actor 1 grips claw hammer tightly.',
    involvedActors: ['ACTOR-01', 'ACTOR-02', 'ACTOR-03'],
    weaponsUsed: ['Claw Hammer'],
    captionText: '⚠️ VIOLENCE NOTED: Initial confrontation detected. Corridor blocked by ~30 hostiles. Protagonist armed with claw hammer. Threat level: ESCALATING.',
  },
  {
    id: 2,
    timestamp: '00:08 — 00:25',
    frameRange: 'F0240 — F0750',
    type: 'First Strike — Protagonist Attacks',
    severity: 'high',
    description: 'Oh Dae-su initiates the attack, swinging the claw hammer at front-line opponents. ACTOR-03 and ACTOR-06 are struck. The mob momentarily retreats.',
    involvedActors: ['ACTOR-01', 'ACTOR-03', 'ACTOR-04', 'ACTOR-06'],
    weaponsUsed: ['Claw Hammer', 'Wooden Sticks'],
    captionText: '🔴 VIOLENCE NOTED: First strike by ACTOR-01 (Oh Dae-su). Claw hammer deployed against front-line. 2 opponents struck. Mob retreating momentarily.',
  },
  {
    id: 3,
    timestamp: '00:25 — 00:55',
    frameRange: 'F0750 — F1650',
    type: 'Mob Retaliation — Group Attack',
    severity: 'critical',
    description: 'The mob retaliates. Multiple opponents attack simultaneously with wooden sticks and knives. Oh Dae-su is hit from multiple directions. He uses defensive stance while counter-attacking with the hammer.',
    involvedActors: ['ACTOR-01', 'ACTOR-02', 'ACTOR-03', 'ACTOR-04', 'ACTOR-05', 'ACTOR-07', 'ACTOR-08'],
    weaponsUsed: ['Claw Hammer', 'Wooden Sticks', 'Knives'],
    captionText: '🔴🔴 VIOLENCE NOTED: CRITICAL — Mob retaliation in progress. Multiple weapon strikes detected. ACTOR-01 sustaining hits. Defensive stance detected via skeletal tracking.',
  },
  {
    id: 4,
    timestamp: '00:55 — 01:30',
    frameRange: 'F1650 — F2700',
    type: 'Weapon Escalation — Knife Deployment',
    severity: 'critical',
    description: 'ACTOR-04, ACTOR-08, and ACTOR-14 deploy knives. The combat becomes more lethal. Oh Dae-su sustains a knife wound to the back (ACTOR-08). He retaliates with hammer strikes.',
    involvedActors: ['ACTOR-01', 'ACTOR-04', 'ACTOR-08', 'ACTOR-14', 'ACTOR-12', 'ACTOR-15'],
    weaponsUsed: ['Claw Hammer', 'Knives', 'Wooden Sticks'],
    captionText: '🔴🔴🔴 VIOLENCE NOTED: CRITICAL — Edged weapon escalation! Knife wounds detected on ACTOR-01. Lethal force in use. Multiple armed combatants active.',
  },
  {
    id: 5,
    timestamp: '01:30 — 02:15',
    frameRange: 'F2700 — F3870',
    type: 'Corridor Battle — Horizontal Push',
    severity: 'critical',
    description: 'Oh Dae-su pushes through the corridor, fighting opponents one-by-one and in groups. The bottleneck effect forces sequential combat. Second wave of mob members engage.',
    involvedActors: ['ACTOR-01', 'ACTOR-09', 'ACTOR-10', 'ACTOR-11', 'ACTOR-16', 'ACTOR-17', 'ACTOR-19', 'ACTOR-20'],
    weaponsUsed: ['Claw Hammer', 'Wooden Sticks', 'Fists'],
    captionText: '🔴🔴 VIOLENCE NOTED: Sustained corridor battle. Protagonist advancing through bottleneck. Second wave engaging. 8+ active combatants in frame.',
  },
  {
    id: 6,
    timestamp: '02:15 — 02:50',
    frameRange: 'F3870 — F5100',
    type: 'Fatigue Onset — Protagonist Weakening',
    severity: 'high',
    description: 'LSTM skeletal tracking detects fatigue in Oh Dae-su. Swing speed reduced by 40%. Defensive gaps increasing. Mob senses weakness and intensifies attacks. Actor is visibly exhausted but continues fighting.',
    involvedActors: ['ACTOR-01', 'ACTOR-21', 'ACTOR-22', 'ACTOR-24', 'ACTOR-25', 'ACTOR-26'],
    weaponsUsed: ['Claw Hammer (reduced effectiveness)', 'Wooden Sticks', 'Fists'],
    captionText: '⚠️ PREDICTION: Fatigue detected in ACTOR-01. Swing velocity −40%. Defensive posture deteriorating. LSTM model predicts: vulnerability window opening.',
  },
  {
    id: 7,
    timestamp: '02:50 — 03:15',
    frameRange: 'F5100 — F5850',
    type: 'Near-Defeat — Protagonist Down',
    severity: 'critical',
    description: 'Oh Dae-su is knocked down. Multiple opponents attack while he is on the ground. Knife embedded in his back. He struggles to stand while fending off kicks and strikes.',
    involvedActors: ['ACTOR-01', 'ACTOR-08', 'ACTOR-23', 'ACTOR-28', 'ACTOR-29', 'ACTOR-30'],
    weaponsUsed: ['Knives', 'Wooden Sticks', 'Fists', 'Kicks'],
    captionText: '🔴🔴🔴 VIOLENCE NOTED: CRITICAL — ACTOR-01 DOWN. Ground-level attacks detected. Knife embedded (dorsal region). Multiple assailants on grounded target.',
  },
  {
    id: 8,
    timestamp: '03:15 — 03:30',
    frameRange: 'F5850 — F6300',
    type: 'Final Breakout Attempt',
    severity: 'critical',
    description: 'Despite severe injuries and fatigue, Oh Dae-su rises and makes a final breakout attempt. Using remaining strength, he swings the hammer in wide arcs to clear a path through the remaining mob members.',
    involvedActors: ['ACTOR-01', 'ACTOR-02', 'ACTOR-30', 'ACTOR-31'],
    weaponsUsed: ['Claw Hammer'],
    captionText: '⚡ PREDICTION CONFIRMED: Final breakout attempt by ACTOR-01. Wide-arc hammer strikes clearing path. Remaining opponents: 4-6 active. Predicted outcome: PARTIAL ESCAPE.',
  },
];

// ================================================================
// LSTM PREDICTIONS — NEXT MOVE ANALYSIS
// ================================================================
export const predictions: Prediction[] = [
  {
    timestamp: '00:05',
    actor: 'ACTOR-01 (Oh Dae-su)',
    currentAction: 'Gripping hammer, assessing corridor',
    predictedNextMove: 'Initiate first strike against nearest opponent (ACTOR-03)',
    confidence: 0.92,
    lstmOutput: 'Action Class: AGGRESSIVE_FORWARD | Velocity Vector: +X',
    riskLevel: 'high',
    reasoning: 'Skeletal pose shows weight shift forward. Arm elevation indicates wind-up for strike. Historical pattern: offensive initiation.',
  },
  {
    timestamp: '00:15',
    actor: 'ACTOR-02 (Thug Leader)',
    currentAction: 'Directing mob members forward',
    predictedNextMove: 'Command flanking attack from ACTOR-05 and ACTOR-07',
    confidence: 0.88,
    lstmOutput: 'Action Class: COMMAND_GESTURE | Social Signal: DIRECT',
    riskLevel: 'critical',
    reasoning: 'Hand gesture patterns match coordination signals. Mob members responding to directional cues. Leader maintaining rear position.',
  },
  {
    timestamp: '00:30',
    actor: 'Mob Front Line',
    currentAction: 'Retaliating with sticks and knives',
    predictedNextMove: 'Coordinated pincer attack — front and rear simultaneously',
    confidence: 0.85,
    lstmOutput: 'Action Class: COORDINATED_ASSAULT | Formation: PINCER',
    riskLevel: 'critical',
    reasoning: 'Movement vectors show converging trajectories from both corridor ends. ACTOR-07 repositioning behind protagonist.',
  },
  {
    timestamp: '01:00',
    actor: 'ACTOR-04',
    currentAction: 'Advancing with knife drawn',
    predictedNextMove: 'Stabbing attack targeting torso of ACTOR-01',
    confidence: 0.91,
    lstmOutput: 'Action Class: EDGED_WEAPON_THRUST | Target Zone: TORSO',
    riskLevel: 'critical',
    reasoning: 'Knife grip pattern indicates thrust preparation. Body lean forward, dominant arm cocked. Close range engagement imminent.',
  },
  {
    timestamp: '01:45',
    actor: 'ACTOR-01 (Oh Dae-su)',
    currentAction: 'Fighting through second wave',
    predictedNextMove: 'Switch to defensive stance — energy conservation mode',
    confidence: 0.87,
    lstmOutput: 'Action Class: DEFENSIVE_TRANSITION | Energy: DEPLETING',
    riskLevel: 'high',
    reasoning: 'Swing frequency dropping. Recovery time between strikes increasing by 0.3s. LSTM fatigue model predicts transition to defensive posture.',
  },
  {
    timestamp: '02:20',
    actor: 'ACTOR-01 (Oh Dae-su)',
    currentAction: 'Visibly fatigued, slower movements',
    predictedNextMove: 'Fatigue-induced stumble followed by brief recovery',
    confidence: 0.93,
    lstmOutput: 'Action Class: FATIGUE_STUMBLE | Recovery: 2.1s estimated',
    riskLevel: 'critical',
    reasoning: 'Joint angle variance increasing (knee instability). Center of mass oscillation detected. 93% probability of stumble within next 15 frames.',
  },
  {
    timestamp: '02:55',
    actor: 'ACTOR-01 (Oh Dae-su)',
    currentAction: 'Knocked down, ground level',
    predictedNextMove: 'Attempted recovery — will rise using wall support',
    confidence: 0.78,
    lstmOutput: 'Action Class: GROUND_RECOVERY | Method: WALL_ASSIST',
    riskLevel: 'critical',
    reasoning: 'Historical behavior pattern shows high recovery rate. Proximity to wall provides leverage point. Hand placement on wall detected.',
  },
  {
    timestamp: '03:10',
    actor: 'ACTOR-01 (Oh Dae-su)',
    currentAction: 'Rising from ground with knife in back',
    predictedNextMove: 'Final breakout — wide-arc hammer swings to clear corridor',
    confidence: 0.84,
    lstmOutput: 'Action Class: BREAKOUT_ATTEMPT | Pattern: WIDE_ARC_CLEAR',
    riskLevel: 'critical',
    reasoning: 'Adrenaline surge detected (sudden velocity increase). Grip tightening on hammer. Rotational momentum building for wide sweep attack.',
  },
  {
    timestamp: '03:25',
    actor: 'Remaining Mob',
    currentAction: '4-6 opponents still standing',
    predictedNextMove: 'Partial retreat — some will flee, 2-3 will make final stand',
    confidence: 0.81,
    lstmOutput: 'Action Class: MOB_FRACTURE | Split: FLEE/STAND ratio 60/40',
    riskLevel: 'high',
    reasoning: 'Mob cohesion breaking. Rear members showing backward velocity vectors. Front survivors showing hesitation patterns in skeletal data.',
  },
];

// ================================================================
// AUTOMATIC CAPTIONS — REAL-TIME FEED
// ================================================================
export const captions: Caption[] = [
  { timestamp: '00:00', frameNum: 1, text: '[SYSTEM] Surveillance feed active. Corridor scene detected. DeepSORT tracking initialized.', type: 'status' },
  { timestamp: '00:02', frameNum: 60, text: '[DETECTION] 31 persons detected in frame. Assigning IDs: ACTOR-01 through ACTOR-31.', type: 'status' },
  { timestamp: '00:03', frameNum: 90, text: '[WEAPON] Claw hammer detected — ACTOR-01 (Oh Dae-su). Classification: Blunt weapon. Confidence: 97%', type: 'weapon' },
  { timestamp: '00:04', frameNum: 120, text: '[WEAPON] Multiple wooden sticks detected — ACTOR-02, 03, 05, 07, 10, 12, 15, 17, 19, 21, 24, 26, 28, 31. Classification: Blunt weapons.', type: 'weapon' },
  { timestamp: '00:05', frameNum: 150, text: '[WEAPON] Knives detected — ACTOR-04, 08, 14, 23, 30. Classification: Edged weapons. THREAT LEVEL: CRITICAL', type: 'weapon' },
  { timestamp: '00:06', frameNum: 180, text: '[MOVEMENT] ACTOR-01 advancing forward. Aggressive posture detected. DeepSORT tracking stable.', type: 'movement' },
  { timestamp: '00:08', frameNum: 240, text: '⚠️ [VIOLENCE NOTED] Initial confrontation. ACTOR-01 faces mob blocking corridor. Tension score: 78/100', type: 'violence' },
  { timestamp: '00:10', frameNum: 300, text: '🔴 [VIOLENCE NOTED] First strike! ACTOR-01 swings claw hammer at ACTOR-03. Impact detected. Severity: HIGH', type: 'violence' },
  { timestamp: '00:15', frameNum: 450, text: '[PREDICTION] LSTM Output: ACTOR-02 will command flanking maneuver. Confidence: 88%', type: 'prediction' },
  { timestamp: '00:20', frameNum: 600, text: '🔴 [VIOLENCE NOTED] ACTOR-06 struck by hammer. ACTOR-07 attacking from behind. Multi-directional combat.', type: 'violence' },
  { timestamp: '00:30', frameNum: 900, text: '🔴🔴 [VIOLENCE NOTED] Mob retaliation in progress. 7 active combatants engaging ACTOR-01 simultaneously.', type: 'violence' },
  { timestamp: '00:40', frameNum: 1200, text: '[MOVEMENT] ACTOR-01 defensive stance detected. Blocking with hammer shaft. Skeletal tracking shows guard posture.', type: 'movement' },
  { timestamp: '00:55', frameNum: 1650, text: '🔴🔴🔴 [VIOLENCE NOTED] CRITICAL — Knife deployment by ACTOR-04, ACTOR-08. Edged weapon escalation!', type: 'violence' },
  { timestamp: '01:05', frameNum: 1890, text: '[WEAPON] ACTOR-08 knife thrust detected toward ACTOR-01 dorsal region. IMPACT CONFIRMED.', type: 'weapon' },
  { timestamp: '01:15', frameNum: 2130, text: '[PREDICTION] LSTM: ACTOR-01 predicted to switch to defensive mode. Energy depletion: 35%. Confidence: 87%', type: 'prediction' },
  { timestamp: '01:30', frameNum: 2700, text: '🔴🔴 [VIOLENCE NOTED] Corridor battle — horizontal push. ACTOR-01 advancing through bottleneck.', type: 'violence' },
  { timestamp: '01:45', frameNum: 3150, text: '[MOVEMENT] Second wave engaging: ACTOR-16 through ACTOR-22 entering combat zone.', type: 'movement' },
  { timestamp: '02:00', frameNum: 3600, text: '🔴 [VIOLENCE NOTED] ACTOR-01 sustaining multiple hits. Stick strikes from ACTOR-10, 12, 17.', type: 'violence' },
  { timestamp: '02:15', frameNum: 3870, text: '[PREDICTION] LSTM Fatigue Model: Swing speed −40%. Defensive gaps increasing. Vulnerability: HIGH', type: 'prediction' },
  { timestamp: '02:30', frameNum: 4500, text: '⚠️ [VIOLENCE NOTED] ACTOR-01 showing fatigue markers. Mob intensifying attacks.', type: 'violence' },
  { timestamp: '02:50', frameNum: 5100, text: '🔴🔴🔴 [VIOLENCE NOTED] CRITICAL — ACTOR-01 DOWN! Ground-level assault in progress!', type: 'violence' },
  { timestamp: '02:55', frameNum: 5250, text: '[WEAPON] Knife embedded in ACTOR-01 dorsal region (ACTOR-08). Wound classification: NON-FATAL but debilitating.', type: 'weapon' },
  { timestamp: '03:00', frameNum: 5400, text: '[PREDICTION] LSTM: 78% probability ACTOR-01 will attempt wall-assisted recovery within 3 seconds.', type: 'prediction' },
  { timestamp: '03:10', frameNum: 5580, text: '[MOVEMENT] ACTOR-01 RISING. Wall-assisted recovery confirmed. Adrenaline surge detected in movement velocity.', type: 'movement' },
  { timestamp: '03:15', frameNum: 5850, text: '⚡ [PREDICTION] Final breakout attempt predicted. Wide-arc hammer pattern detected. Confidence: 84%', type: 'prediction' },
  { timestamp: '03:20', frameNum: 5940, text: '🔴🔴 [VIOLENCE NOTED] Final breakout! ACTOR-01 wide-arc hammer strikes. 3 opponents struck in sweep.', type: 'violence' },
  { timestamp: '03:25', frameNum: 6060, text: '[PREDICTION] Mob fracture predicted: 60% flee, 40% final stand. Cohesion breaking. Confidence: 81%', type: 'prediction' },
  { timestamp: '03:28', frameNum: 6120, text: '[MOVEMENT] Rear mob members retreating. ACTOR-18, 27 fleeing corridor. ACTOR-02 holding position.', type: 'movement' },
  { timestamp: '03:30', frameNum: 6300, text: '[SYSTEM] Scene analysis complete. Total violence events: 8. Max severity: CRITICAL. Outcome: PARTIAL ESCAPE.', type: 'status' },
];

// ================================================================
// WEAPON INVENTORY
// ================================================================
export const weaponSummary = [
  { weapon: 'Claw Hammer', count: 1, holders: ['ACTOR-01'], type: 'Blunt', dangerLevel: 'High', status: 'In Use — Primary Weapon' },
  { weapon: 'Wooden Sticks', count: 14, holders: ['ACTOR-02', '03', '05', '07', '10', '12', '15', '17', '19', '21', '24', '26', '28', '31'], type: 'Blunt', dangerLevel: 'Medium', status: 'In Use — Multiple Holders' },
  { weapon: 'Knives', count: 5, holders: ['ACTOR-04', '08', '14', '23', '30'], type: 'Edged', dangerLevel: 'Critical', status: 'In Use — Lethal Threat' },
  { weapon: 'Bare Hands / Fists', count: 11, holders: ['ACTOR-06', '09', '11', '13', '16', '18', '20', '22', '25', '27', '29'], type: 'None', dangerLevel: 'Low-Medium', status: 'Active — Unarmed Combat' },
];

// ================================================================
// MODEL & PROJECT METRICS
// ================================================================
export const modelInfo = {
  name: 'MobViolNet v2.1',
  framework: 'PyTorch + YOLOv8 + DeepSORT + LSTM',
  detectionModel: 'YOLOv8x (Person & Weapon Detection)',
  trackingModel: 'DeepSORT (Multi-Object Tracking)',
  predictionModel: 'LSTM (Bi-directional, 3-layer)',
  skeletalModel: 'MediaPipe Pose (33 landmarks)',
  inputResolution: '1920×1080',
  processingFPS: '28 fps (RTX 3080)',
  accuracy: 94.7,
  precision: 93.2,
  recall: 95.1,
  f1Score: 94.1,
  weaponDetectionAP: 91.8,
  poseEstimationAccuracy: 96.3,
  violencePredictionAUC: 0.947,
};

export const captorInfo = {
  videoSource: 'Oldboy (2003) — Hallway Fight Scene',
  director: 'Park Chan-wook',
  cinematographer: 'Chung Chung-hoon',
  captureType: 'One-Take Side-View Shot (Simulated Surveillance)',
  originalResolution: '1920×816 (2.35:1 Anamorphic)',
  processedResolution: '1920×1080 (Padded for Analysis)',
  duration: '~3 min 30 sec',
  totalFrames: '~6,300 (at 30fps)',
  fps: 30,
  cameraAngle: 'Fixed Side-View (90° to corridor axis)',
  simulatedCaptor: 'Simulated CCTV — Fixed Corridor Camera',
  location: 'Narrow Dilapidated Hallway / Corridor',
};

// ================================================================
// TIME-SERIES DATA FOR CHARTS
// ================================================================
export const timeSeriesAnalysis = [
  { time: '00:00', violence: 5, threat: 10, fatigue: 0, mobCohesion: 95, actorsActive: 31 },
  { time: '00:10', violence: 45, threat: 55, fatigue: 5, mobCohesion: 92, actorsActive: 30 },
  { time: '00:20', violence: 65, threat: 70, fatigue: 10, mobCohesion: 88, actorsActive: 28 },
  { time: '00:30', violence: 82, threat: 85, fatigue: 15, mobCohesion: 85, actorsActive: 27 },
  { time: '00:45', violence: 90, threat: 88, fatigue: 22, mobCohesion: 80, actorsActive: 25 },
  { time: '01:00', violence: 95, threat: 95, fatigue: 30, mobCohesion: 78, actorsActive: 24 },
  { time: '01:15', violence: 92, threat: 90, fatigue: 38, mobCohesion: 75, actorsActive: 22 },
  { time: '01:30', violence: 88, threat: 85, fatigue: 45, mobCohesion: 70, actorsActive: 20 },
  { time: '01:45', violence: 90, threat: 88, fatigue: 52, mobCohesion: 65, actorsActive: 18 },
  { time: '02:00', violence: 85, threat: 82, fatigue: 60, mobCohesion: 60, actorsActive: 16 },
  { time: '02:15', violence: 78, threat: 75, fatigue: 70, mobCohesion: 55, actorsActive: 14 },
  { time: '02:30', violence: 72, threat: 70, fatigue: 78, mobCohesion: 48, actorsActive: 12 },
  { time: '02:50', violence: 95, threat: 98, fatigue: 88, mobCohesion: 42, actorsActive: 10 },
  { time: '03:00', violence: 85, threat: 80, fatigue: 82, mobCohesion: 35, actorsActive: 8 },
  { time: '03:15', violence: 92, threat: 90, fatigue: 90, mobCohesion: 25, actorsActive: 6 },
  { time: '03:30', violence: 60, threat: 50, fatigue: 95, mobCohesion: 15, actorsActive: 4 },
];
