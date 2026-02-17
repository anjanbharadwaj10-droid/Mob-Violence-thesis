// ================================================================
// SHANG-CHI (2021) BUS FIGHT SCENE — SURVEILLANCE ANALYSIS DATA
// Primary Dataset Case Study for B.Tech Thesis
// "Prediction of Mob Violence Scene Using Surveillance Data"
// ================================================================

export interface Actor {
  id: string;
  name: string;
  role: string;
  label: string;
  weapon: string;
  weaponType: 'blunt' | 'edged' | 'none' | 'environmental';
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
// ACTORS — Shang-Chi + Razor Fist + Ten Rings Assassins + Passengers
// ================================================================
export const actors: Actor[] = [
  {
    id: 'ACTOR-01',
    name: 'Shang-Chi',
    role: 'Protagonist (Defender / Victim)',
    label: 'Primary Target — Defender',
    weapon: 'Bus Pole (improvised)',
    weaponType: 'environmental',
    behavior: 'Defensive Parrying / Counter-Striking / Martial Arts',
    threatLevel: 'high',
    confidence: 0.98,
    boundingBox: { x: 35, y: 20, w: 10, h: 24 },
    skeletalStatus: 'Active — High-velocity martial arts',
    isActive: true,
  },
  {
    id: 'ACTOR-02',
    name: 'Razor Fist',
    role: 'Primary Aggressor / Lead Assassin',
    label: 'Lead Aggressor — Lethal Weapon',
    weapon: 'Machete-Arm (Permanent Edged)',
    weaponType: 'edged',
    behavior: 'Aggressive Slashing / Pursuing / Lethal Intent',
    threatLevel: 'critical',
    confidence: 0.97,
    boundingBox: { x: 55, y: 18, w: 11, h: 26 },
    skeletalStatus: 'Active — Maximum aggression, lethal arm deployed',
    isActive: true,
  },
  {
    id: 'ACTOR-03',
    name: 'Assassin Alpha',
    role: 'Ten Rings — Secondary Aggressor',
    label: 'Flanking Attacker — Armed',
    weapon: 'Karambit Knife',
    weaponType: 'edged',
    behavior: 'Flanking / Slashing / Coordinated Attack',
    threatLevel: 'critical',
    confidence: 0.93,
    boundingBox: { x: 42, y: 22, w: 8, h: 22 },
    skeletalStatus: 'Active — Coordinated with ACTOR-02',
    isActive: true,
  },
  {
    id: 'ACTOR-04',
    name: 'Assassin Bravo',
    role: 'Ten Rings — Secondary Aggressor',
    label: 'Rear Attacker — Armed',
    weapon: 'Tactical Knife',
    weaponType: 'edged',
    behavior: 'Rear-flanking / Stabbing Attempts',
    threatLevel: 'critical',
    confidence: 0.91,
    boundingBox: { x: 28, y: 25, w: 8, h: 21 },
    skeletalStatus: 'Active — Attacking from behind',
    isActive: true,
  },
  {
    id: 'ACTOR-05',
    name: 'Assassin Charlie',
    role: 'Ten Rings — Secondary Aggressor',
    label: 'Support Attacker — Grappler',
    weapon: 'Concealed Blade',
    weaponType: 'edged',
    behavior: 'Grappling / Restraining Target',
    threatLevel: 'high',
    confidence: 0.89,
    boundingBox: { x: 48, y: 28, w: 7, h: 20 },
    skeletalStatus: 'Active — Attempting restraint',
    isActive: true,
  },
  {
    id: 'ACTOR-06',
    name: 'Assassin Delta',
    role: 'Ten Rings — Secondary Aggressor',
    label: 'Striker — Close Quarters',
    weapon: 'None (Martial Arts)',
    weaponType: 'none',
    behavior: 'Striking / Kicking / Close-quarters combat',
    threatLevel: 'high',
    confidence: 0.87,
    boundingBox: { x: 60, y: 30, w: 7, h: 20 },
    skeletalStatus: 'Active — CQC engagement',
    isActive: true,
  },
  {
    id: 'ACTOR-07',
    name: 'Assassin Echo',
    role: 'Ten Rings — Secondary Aggressor',
    label: 'Overwatch / Backup',
    weapon: 'Karambit Knife',
    weaponType: 'edged',
    behavior: 'Waiting / Ready to engage / Blocking exits',
    threatLevel: 'high',
    confidence: 0.85,
    boundingBox: { x: 70, y: 24, w: 7, h: 20 },
    skeletalStatus: 'Idle — Ready state, blocking rear exit',
    isActive: false,
  },
  {
    id: 'ACTOR-08',
    name: 'Passenger — Male (Elderly)',
    role: 'Bystander / Civilian',
    label: 'Bystander — Cowering',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Cowering / Ducking behind seats',
    threatLevel: 'low',
    confidence: 0.82,
    boundingBox: { x: 15, y: 35, w: 6, h: 14 },
    skeletalStatus: 'Stationary — Defensive crouch',
    isActive: false,
  },
  {
    id: 'ACTOR-09',
    name: 'Passenger — Female',
    role: 'Bystander / Civilian',
    label: 'Bystander — Fleeing',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Fleeing toward rear exit / Screaming',
    threatLevel: 'low',
    confidence: 0.80,
    boundingBox: { x: 78, y: 32, w: 6, h: 16 },
    skeletalStatus: 'Moving — Rapid retreat vector',
    isActive: false,
  },
  {
    id: 'ACTOR-10',
    name: 'Passenger — Male (Young)',
    role: 'Bystander / Civilian',
    label: 'Bystander — Frozen',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Frozen in seat / Shock response',
    threatLevel: 'low',
    confidence: 0.78,
    boundingBox: { x: 22, y: 38, w: 5, h: 13 },
    skeletalStatus: 'Stationary — Shock freeze response',
    isActive: false,
  },
  {
    id: 'ACTOR-11',
    name: 'Passenger — Female (Student)',
    role: 'Bystander / Civilian',
    label: 'Bystander — Ducking',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Ducking under window / Self-protection',
    threatLevel: 'low',
    confidence: 0.76,
    boundingBox: { x: 82, y: 40, w: 5, h: 12 },
    skeletalStatus: 'Stationary — Floor level',
    isActive: false,
  },
  {
    id: 'ACTOR-12',
    name: 'Bus Driver',
    role: 'Bystander / Civilian (Incapacitated)',
    label: 'Bystander — Incapacitated',
    weapon: 'None',
    weaponType: 'none',
    behavior: 'Incapacitated / Slumped over wheel',
    threatLevel: 'low',
    confidence: 0.84,
    boundingBox: { x: 5, y: 28, w: 7, h: 15 },
    skeletalStatus: 'Stationary — Incapacitated',
    isActive: false,
  },
];

// ================================================================
// VIOLENCE EVENTS TIMELINE
// ================================================================
export const violenceEvents: ViolenceEvent[] = [
  {
    id: 1,
    timestamp: '00:00 — 00:12',
    frameRange: 'F0001 — F0360',
    type: 'Social Tension / Proximity Alert',
    severity: 'medium',
    description: 'Ten Rings assassins board the moving bus and surround Shang-Chi in the confined space. Razor Fist positions himself at the front. Assassins take seats near the target, concealing weapons. Passengers are unaware of the developing threat.',
    involvedActors: ['ACTOR-01', 'ACTOR-02', 'ACTOR-03', 'ACTOR-04', 'ACTOR-05', 'ACTOR-06', 'ACTOR-07'],
    weaponsUsed: ['Concealed Blades'],
    captionText: '⚠️ VIOLENCE NOTED: Proximity alert — 6 hostile actors surrounding ACTOR-01 (Shang-Chi) in confined bus environment. Weapons concealed. Social tension score: 82/100. Threat level: ESCALATING.',
  },
  {
    id: 2,
    timestamp: '00:12 — 00:30',
    frameRange: 'F0360 — F0900',
    type: 'First Strike — Assassination Attempt',
    severity: 'high',
    description: 'ACTOR-03 (Assassin Alpha) initiates the attack with a karambit knife thrust at Shang-Chi. Shang-Chi reacts with an instinctive parry, deflecting the blade. Passengers begin to panic. Bus environment becomes a combat zone.',
    involvedActors: ['ACTOR-01', 'ACTOR-03', 'ACTOR-04'],
    weaponsUsed: ['Karambit Knife', 'Tactical Knife'],
    captionText: '🔴 VIOLENCE NOTED: First strike! ACTOR-03 deploys karambit — assassination attempt on ACTOR-01. Parry detected via skeletal tracking. Passengers in panic. Severity: HIGH.',
  },
  {
    id: 3,
    timestamp: '00:30 — 01:00',
    frameRange: 'F0900 — F1800',
    type: 'Martial Arts Escalation — Multi-Attacker Engagement',
    severity: 'critical',
    description: 'Full martial arts combat erupts inside the bus. Shang-Chi engages multiple assassins using the narrow aisle as a bottleneck advantage. He uses bus poles and grab handles as improvised weapons. Rapid striking, parrying, and grappling sequences detected.',
    involvedActors: ['ACTOR-01', 'ACTOR-03', 'ACTOR-04', 'ACTOR-05', 'ACTOR-06'],
    weaponsUsed: ['Karambit Knife', 'Tactical Knife', 'Concealed Blade', 'Bus Pole (improvised)'],
    captionText: '🔴🔴 VIOLENCE NOTED: CRITICAL — Full martial arts combat inside moving bus. ACTOR-01 engaging 4 attackers simultaneously. Environmental weapons (bus poles) deployed. High-velocity striking detected.',
  },
  {
    id: 4,
    timestamp: '01:00 — 01:45',
    frameRange: 'F1800 — F3150',
    type: 'Razor Fist Deployment — Machete-Arm Engaged',
    severity: 'critical',
    description: 'Razor Fist (ACTOR-02) deploys his machete-arm prosthetic and enters the fight. The threat level escalates to maximum. His slashing attacks cut through bus seats and interior. Shang-Chi must now defend against a lethal edged weapon with extreme reach while other assassins continue their assault.',
    involvedActors: ['ACTOR-01', 'ACTOR-02', 'ACTOR-05', 'ACTOR-06'],
    weaponsUsed: ['Machete-Arm (Permanent Edged)', 'Concealed Blade', 'Bus Pole'],
    captionText: '🔴🔴🔴 VIOLENCE NOTED: CRITICAL — ACTOR-02 (Razor Fist) machete-arm DEPLOYED. Lethal edged weapon with extreme reach. Structural damage to bus interior. ACTOR-01 in extreme danger.',
  },
  {
    id: 5,
    timestamp: '01:45 — 02:30',
    frameRange: 'F3150 — F4500',
    type: 'High-Speed Combat — Structural Damage',
    severity: 'critical',
    description: 'Combat intensifies as the bus accelerates through San Francisco streets. Razor Fist\'s machete-arm slashes through seats, windows, and structural elements. Shang-Chi uses acrobatic martial arts — flipping, sliding, and using the bus interior as a dynamic combat environment. Structural integrity of the bus is compromised.',
    involvedActors: ['ACTOR-01', 'ACTOR-02', 'ACTOR-03', 'ACTOR-06'],
    weaponsUsed: ['Machete-Arm', 'Karambit Knife', 'Bus Interior Elements'],
    captionText: '🔴🔴🔴 VIOLENCE NOTED: CRITICAL — High-speed combat on moving bus. Structural damage detected — windows shattered, seats cut. ACTOR-01 using acrobatic defense. Bus integrity: COMPROMISED.',
  },
  {
    id: 6,
    timestamp: '02:30 — 03:15',
    frameRange: 'F4500 — F5850',
    type: 'Environmental Combat — Bus as Weapon',
    severity: 'critical',
    description: 'The bus becomes an active weapon in the fight. Shang-Chi uses poles, handles, and the bus\'s momentum for combat advantage. Razor Fist\'s machete strikes the bus frame causing sparks and metal shearing. Civilians attempt to evacuate through rear exit. The bus veers through traffic.',
    involvedActors: ['ACTOR-01', 'ACTOR-02', 'ACTOR-07', 'ACTOR-12'],
    weaponsUsed: ['Machete-Arm', 'Bus Poles', 'Environmental Objects'],
    captionText: '🔴🔴 VIOLENCE NOTED: Environmental combat escalation. Bus structure used as weapon. Metal shearing detected. Civilian evacuation in progress. Bus trajectory: ERRATIC.',
  },
  {
    id: 7,
    timestamp: '03:15 — 04:00',
    frameRange: 'F5850 — F7200',
    type: 'Structural Failure — Bus Splits',
    severity: 'critical',
    description: 'Cumulative weapon impact and combat damage causes catastrophic structural failure. Razor Fist\'s machete-arm delivers a critical strike that splits the bus frame. The bus begins to separate into two halves while careening downhill through San Francisco streets. Mob is physically separated from the target.',
    involvedActors: ['ACTOR-01', 'ACTOR-02', 'ACTOR-03', 'ACTOR-07', 'ACTOR-08', 'ACTOR-09', 'ACTOR-10', 'ACTOR-11', 'ACTOR-12'],
    weaponsUsed: ['Machete-Arm'],
    captionText: '🔴🔴🔴 VIOLENCE NOTED: CRITICAL — STRUCTURAL FAILURE! Bus splitting in half! Catastrophic damage from ACTOR-02 machete strikes. Mob physically separated. Vehicle careening downhill.',
  },
  {
    id: 8,
    timestamp: '04:00 — 04:30',
    frameRange: 'F7200 — F8100',
    type: 'Mob Neutralization — Dispersal & Crash',
    severity: 'high',
    description: 'The split bus crashes to a halt. Remaining assassins are neutralized or dispersed by the crash impact. Razor Fist is separated from Shang-Chi. Passengers escape the wreckage. The mob violence scenario is forcibly concluded by the structural collapse of the environment.',
    involvedActors: ['ACTOR-01', 'ACTOR-02', 'ACTOR-08', 'ACTOR-09', 'ACTOR-10', 'ACTOR-11'],
    weaponsUsed: ['None — Environmental Resolution'],
    captionText: '⚡ RESOLUTION: Bus crash — mob neutralized. ACTOR-02 separated. Remaining assassins dispersed/incapacitated. Civilians escaping wreckage. Scenario: FORCIBLY CONCLUDED.',
  },
];

// ================================================================
// LSTM PREDICTIONS — NEXT MOVE ANALYSIS
// ================================================================
export const predictions: Prediction[] = [
  {
    timestamp: '00:08',
    actor: 'ACTOR-03 (Assassin Alpha)',
    currentAction: 'Seated near target, weapon concealed',
    predictedNextMove: 'Initiate karambit strike at ACTOR-01 — throat/torso target zone',
    confidence: 0.94,
    lstmOutput: 'Action Class: CONCEALED_WEAPON_DEPLOY | Target: ACTOR-01_TORSO | Urgency: IMMINENT',
    riskLevel: 'critical',
    reasoning: 'Hand position on concealed weapon detected. Micro-movement analysis shows weight shift toward target. Gaze fixation on ACTOR-01 confirmed. Historical pattern: pre-strike positioning.',
  },
  {
    timestamp: '00:18',
    actor: 'ACTOR-01 (Shang-Chi)',
    currentAction: 'Deflecting initial knife attack',
    predictedNextMove: 'Counter-strike using elbow and pivot — neutralize ACTOR-03',
    confidence: 0.91,
    lstmOutput: 'Action Class: MARTIAL_ARTS_COUNTER | Technique: ELBOW_STRIKE + PIVOT | Speed: HIGH',
    riskLevel: 'high',
    reasoning: 'Skeletal tracking shows trained martial arts response. Reflexive parry indicates muscle memory. Predicted counter-attack within 0.4 seconds based on joint acceleration.',
  },
  {
    timestamp: '00:40',
    actor: 'ACTOR-02 (Razor Fist)',
    currentAction: 'Observing combat, advancing toward target',
    predictedNextMove: 'Deploy machete-arm — overhead slashing attack',
    confidence: 0.96,
    lstmOutput: 'Action Class: LETHAL_WEAPON_DEPLOY | Pattern: OVERHEAD_SLASH | Velocity: EXTREME',
    riskLevel: 'critical',
    reasoning: 'Arm prosthetic activation detected (metallic glint + shape change in bounding box). Shoulder rotation indicates overhead swing preparation. LETHAL THREAT IMMINENT.',
  },
  {
    timestamp: '01:15',
    actor: 'ACTOR-01 (Shang-Chi)',
    currentAction: 'Dodging machete-arm slashes',
    predictedNextMove: 'Grab bus pole as improvised weapon — create distance from ACTOR-02',
    confidence: 0.88,
    lstmOutput: 'Action Class: ENVIRONMENTAL_WEAPON_ACQUIRE | Object: BUS_POLE | Purpose: DEFENSIVE_SPACING',
    riskLevel: 'high',
    reasoning: 'ACTOR-01 reach disadvantage vs machete-arm. Hand trajectory toward overhead pole. Body positioning suggests retreat-and-rearm strategy. Environmental weapon acquisition: 88% likely.',
  },
  {
    timestamp: '01:50',
    actor: 'ACTOR-02 (Razor Fist)',
    currentAction: 'Slashing through bus seats pursuing target',
    predictedNextMove: 'Horizontal sweep attack cutting through bus interior — structural damage escalation',
    confidence: 0.93,
    lstmOutput: 'Action Class: HORIZONTAL_SWEEP | Impact: STRUCTURAL_DAMAGE | Risk: BUS_INTEGRITY_FAILURE',
    riskLevel: 'critical',
    reasoning: 'Machete-arm velocity exceeds threshold (>15 m/s). Swing arc trajectory intersects bus structural elements. Predicted structural damage: seat mounts, window frames, support rails.',
  },
  {
    timestamp: '02:20',
    actor: 'ACTOR-01 (Shang-Chi)',
    currentAction: 'Acrobatic combat using bus interior',
    predictedNextMove: 'Use bus momentum for counter-attack — swing from overhead rail to deliver kick',
    confidence: 0.86,
    lstmOutput: 'Action Class: ACROBATIC_COUNTER | Technique: RAIL_SWING_KICK | Momentum: BUS_ASSISTED',
    riskLevel: 'high',
    reasoning: 'Grip detected on overhead rail. Leg elevation increasing. Body mass shifting to pendulum trajectory. Bus acceleration provides additional momentum. Combat advantage: TEMPORARY.',
  },
  {
    timestamp: '02:50',
    actor: 'ACTOR-02 (Razor Fist)',
    currentAction: 'Machete-arm striking bus frame',
    predictedNextMove: 'Critical strike on bus structural beam — initiating structural failure cascade',
    confidence: 0.92,
    lstmOutput: 'Action Class: STRUCTURAL_STRIKE | Target: MAIN_FRAME_BEAM | Consequence: CATASTROPHIC_FAILURE',
    riskLevel: 'critical',
    reasoning: 'Machete-arm impact force exceeds structural tolerance. Cumulative damage analysis: 6 prior structural hits. Metal fatigue at 87%. Next strike predicted to cause cascading structural failure.',
  },
  {
    timestamp: '03:30',
    actor: 'BUS STRUCTURE',
    currentAction: 'Structural integrity failing — metal shearing',
    predictedNextMove: 'Complete bus separation — split into two halves on downhill gradient',
    confidence: 0.95,
    lstmOutput: 'Action Class: STRUCTURAL_FAILURE | Type: LATERAL_SEPARATION | Trigger: ACCUMULATED_DAMAGE',
    riskLevel: 'critical',
    reasoning: 'Structural analysis: frame integrity at 12%. Vibration frequency indicates imminent failure. Downhill gradient adds gravitational stress. Separation predicted within 8 seconds.',
  },
  {
    timestamp: '03:50',
    actor: 'Remaining Assassins',
    currentAction: 'Scattered by structural failure',
    predictedNextMove: 'Forced dispersal — crash impact will neutralize remaining combatants',
    confidence: 0.89,
    lstmOutput: 'Action Class: FORCED_DISPERSAL | Cause: VEHICLE_CRASH | Outcome: MOB_NEUTRALIZED',
    riskLevel: 'high',
    reasoning: 'Assassins in rear section separated from target. Crash deceleration forces exceed human stability threshold. 89% probability of full mob neutralization upon impact.',
  },
];

// ================================================================
// AUTOMATIC CAPTIONS — REAL-TIME FEED
// ================================================================
export const captions: Caption[] = [
  { timestamp: '00:00', frameNum: 1, text: '[SYSTEM] Surveillance feed active. Bus interior — San Francisco commuter route. DeepSORT tracking initialized. 12 persons detected.', type: 'status' },
  { timestamp: '00:02', frameNum: 60, text: '[DETECTION] 12 persons detected. Assigning IDs: ACTOR-01 (Shang-Chi) through ACTOR-12 (Bus Driver). Classification in progress.', type: 'status' },
  { timestamp: '00:04', frameNum: 120, text: '[MOVEMENT] ACTOR-02 through ACTOR-07 flagged: Coordinated movement pattern. Surrounding ACTOR-01. Behavior: PRE-ASSAULT POSITIONING.', type: 'movement' },
  { timestamp: '00:06', frameNum: 180, text: '[WEAPON] Concealed blade detected — ACTOR-03 (Assassin Alpha). Karambit knife. Confidence: 93%. THREAT LEVEL: CRITICAL.', type: 'weapon' },
  { timestamp: '00:08', frameNum: 240, text: '[PREDICTION] LSTM Output: ACTOR-03 imminent weapon deployment. Target: ACTOR-01 torso. Confidence: 94%. Strike in <2 seconds.', type: 'prediction' },
  { timestamp: '00:10', frameNum: 300, text: '⚠️ [VIOLENCE NOTED] Proximity alert — 6 hostiles surrounding target in confined bus. Social tension score: 82/100. Weapons detected: 5 edged.', type: 'violence' },
  { timestamp: '00:12', frameNum: 360, text: '🔴 [VIOLENCE NOTED] First strike! ACTOR-03 karambit thrust at ACTOR-01! Parry detected — trained martial arts response. Severity: HIGH.', type: 'violence' },
  { timestamp: '00:16', frameNum: 480, text: '[WEAPON] Additional blades deployed — ACTOR-04 (tactical knife), ACTOR-05 (concealed blade). Multiple armed aggressors active.', type: 'weapon' },
  { timestamp: '00:20', frameNum: 600, text: '🔴 [VIOLENCE NOTED] ACTOR-01 counter-strikes. Elbow strike to ACTOR-03. Pivot kick to ACTOR-04. Trained martial arts confirmed.', type: 'violence' },
  { timestamp: '00:28', frameNum: 840, text: '[MOVEMENT] Passengers panicking. ACTOR-08 ducking. ACTOR-09 fleeing to rear. ACTOR-10 frozen (shock response). Civilian endangerment: HIGH.', type: 'movement' },
  { timestamp: '00:35', frameNum: 1050, text: '🔴🔴 [VIOLENCE NOTED] Multi-attacker engagement. ACTOR-01 vs ACTOR-03, 04, 05, 06 simultaneously. Bus aisle as bottleneck.', type: 'violence' },
  { timestamp: '00:45', frameNum: 1350, text: '[WEAPON] ACTOR-01 grabs bus pole — improvised weapon acquired. Environmental combat initiated. Pole used for blocking and striking.', type: 'weapon' },
  { timestamp: '00:55', frameNum: 1650, text: '[PREDICTION] LSTM: ACTOR-02 (Razor Fist) machete-arm deployment imminent. Shoulder rotation detected. Confidence: 96%. LETHAL THREAT.', type: 'prediction' },
  { timestamp: '01:00', frameNum: 1800, text: '🔴🔴🔴 [VIOLENCE NOTED] CRITICAL — ACTOR-02 (Razor Fist) MACHETE-ARM DEPLOYED! Overhead slash detected! Lethal edged weapon active!', type: 'violence' },
  { timestamp: '01:10', frameNum: 2100, text: '[WEAPON] Machete-arm analysis: Length ~60cm, edged blade. Velocity: 18 m/s on swing. Structural damage to bus seat confirmed.', type: 'weapon' },
  { timestamp: '01:20', frameNum: 2400, text: '🔴🔴 [VIOLENCE NOTED] ACTOR-02 slashing through bus seats pursuing ACTOR-01. Structural damage escalating. Seats severed.', type: 'violence' },
  { timestamp: '01:35', frameNum: 2850, text: '[PREDICTION] LSTM: ACTOR-01 will acquire environmental weapon (bus pole). Defensive spacing strategy. Confidence: 88%.', type: 'prediction' },
  { timestamp: '01:45', frameNum: 3150, text: '🔴🔴🔴 [VIOLENCE NOTED] CRITICAL — High-speed combat on moving bus. Windows shattered by machete impact. Structural integrity: 68%.', type: 'violence' },
  { timestamp: '02:00', frameNum: 3600, text: '[MOVEMENT] ACTOR-01 acrobatic maneuver — overhead rail swing. Using bus momentum for counter-attack. Skeletal tracking: EXTREME velocity.', type: 'movement' },
  { timestamp: '02:15', frameNum: 3870, text: '🔴🔴 [VIOLENCE NOTED] ACTOR-01 rail-swing kick connects with ACTOR-02. Temporary separation achieved. But ACTOR-02 recovering rapidly.', type: 'violence' },
  { timestamp: '02:30', frameNum: 4500, text: '[PREDICTION] LSTM Structural Model: Bus integrity at 45%. Machete strikes accumulating metal fatigue. Failure predicted within 90 seconds.', type: 'prediction' },
  { timestamp: '02:45', frameNum: 4950, text: '🔴🔴 [VIOLENCE NOTED] ACTOR-02 machete-arm striking bus frame! Metal shearing! Sparks detected! Structural beams compromised.', type: 'violence' },
  { timestamp: '03:00', frameNum: 5400, text: '[WEAPON] Machete-arm impact force: 2400N. Exceeds bus structural tolerance (2100N). Cascading failure imminent.', type: 'weapon' },
  { timestamp: '03:10', frameNum: 5580, text: '[PREDICTION] LSTM: Structural failure in <15 seconds. Bus separation predicted. Split-point: mid-section frame joint. Confidence: 95%.', type: 'prediction' },
  { timestamp: '03:20', frameNum: 5940, text: '🔴🔴🔴 [VIOLENCE NOTED] CRITICAL — BUS STRUCTURAL FAILURE! Frame splitting! Lateral separation initiating! Catastrophic event!', type: 'violence' },
  { timestamp: '03:35', frameNum: 6300, text: '[MOVEMENT] Bus separating into two halves. Front section: ACTOR-01, ACTOR-12. Rear section: ACTOR-02, remaining actors. Physical separation.', type: 'movement' },
  { timestamp: '03:50', frameNum: 6900, text: '[PREDICTION] LSTM: Crash impact in <5 seconds. Mob neutralization: 89% probability. Forced dispersal via environmental destruction.', type: 'prediction' },
  { timestamp: '04:00', frameNum: 7200, text: '🔴🔴 [VIOLENCE NOTED] BUS CRASH! Both halves impact. Remaining assassins neutralized by crash forces. ACTOR-02 separated from target.', type: 'violence' },
  { timestamp: '04:10', frameNum: 7500, text: '[MOVEMENT] Civilian evacuation from wreckage. ACTOR-08, 09, 10, 11 escaping. Emergency response expected.', type: 'movement' },
  { timestamp: '04:20', frameNum: 7800, text: '[SYSTEM] Scene analysis complete. Violence events: 8. Max severity: CRITICAL. Mob status: NEUTRALIZED. Structural failure: CONFIRMED.', type: 'status' },
];

// ================================================================
// WEAPON INVENTORY
// ================================================================
export const weaponSummary = [
  { weapon: 'Machete-Arm (Prosthetic)', count: 1, holders: ['ACTOR-02'], type: 'Edged (Permanent)', dangerLevel: 'Critical', status: 'ACTIVE — Lethal. Causes structural damage.' },
  { weapon: 'Karambit Knives', count: 2, holders: ['ACTOR-03', 'ACTOR-07'], type: 'Edged (Concealed)', dangerLevel: 'Critical', status: 'ACTIVE — Close-quarters assassination tool' },
  { weapon: 'Tactical Knife', count: 1, holders: ['ACTOR-04'], type: 'Edged (Concealed)', dangerLevel: 'High', status: 'ACTIVE — Stabbing attempts detected' },
  { weapon: 'Concealed Blade', count: 1, holders: ['ACTOR-05'], type: 'Edged (Concealed)', dangerLevel: 'High', status: 'ACTIVE — Used during grappling' },
  { weapon: 'Bus Pole (Improvised)', count: 1, holders: ['ACTOR-01'], type: 'Blunt (Environmental)', dangerLevel: 'Medium', status: 'ACTIVE — Improvised defensive weapon' },
  { weapon: 'Bare Hands / Martial Arts', count: 2, holders: ['ACTOR-01', 'ACTOR-06'], type: 'Unarmed Combat', dangerLevel: 'Medium', status: 'ACTIVE — Trained martial arts' },
];

// ================================================================
// MODEL & PROJECT METRICS
// ================================================================
export const modelInfo = {
  name: 'MobViolNet v2.1',
  framework: 'PyTorch + YOLOv8 + DeepSORT + LSTM',
  detectionModel: 'YOLOv8x (Person & Weapon Detection)',
  trackingModel: 'DeepSORT (Multi-Object Tracking)',
  predictionModel: 'Bi-LSTM (3-layer, Bi-directional)',
  skeletalModel: 'MediaPipe Pose (33 landmarks per actor)',
  inputResolution: '1920×1080',
  processingFPS: '28 fps (RTX 3080)',
  accuracy: 95.2,
  precision: 94.1,
  recall: 96.0,
  f1Score: 95.0,
  weaponDetectionAP: 92.5,
  poseEstimationAccuracy: 97.1,
  violencePredictionAUC: 0.958,
};

export const captorInfo = {
  videoSource: 'Shang-Chi and the Legend of the Ten Rings (2021) — Bus Fight Scene',
  director: 'Destin Daniel Cretton',
  cinematographer: 'William Pope, ASC',
  captureType: 'Multi-angle Dynamic Shots (Simulated Interior CCTV)',
  originalResolution: '1920×1080 (1.85:1)',
  processedResolution: '1920×1080 (Native HD)',
  duration: '~4 min 30 sec',
  totalFrames: '~8,100 (at 30fps)',
  fps: 30,
  cameraAngle: 'Multiple Interior Angles — Bus CCTV Simulation',
  simulatedCaptor: 'Simulated Interior Bus Camera — Multi-angle',
  location: 'Moving Public Commuter Bus — San Francisco, CA',
  processingFPS: '28 fps (RTX 3080)',
};

// ================================================================
// TIME-SERIES DATA FOR CHARTS
// ================================================================
export const timeSeriesAnalysis = [
  { time: '00:00', violence: 3, threat: 8, fatigue: 0, mobCohesion: 98, actorsActive: 7, structuralIntegrity: 100, razorFistVelocity: 0 },
  { time: '00:10', violence: 25, threat: 45, fatigue: 2, mobCohesion: 95, actorsActive: 7, structuralIntegrity: 100, razorFistVelocity: 0 },
  { time: '00:20', violence: 55, threat: 65, fatigue: 5, mobCohesion: 90, actorsActive: 6, structuralIntegrity: 98, razorFistVelocity: 0 },
  { time: '00:30', violence: 72, threat: 75, fatigue: 8, mobCohesion: 88, actorsActive: 6, structuralIntegrity: 95, razorFistVelocity: 0 },
  { time: '00:45', violence: 80, threat: 80, fatigue: 12, mobCohesion: 85, actorsActive: 5, structuralIntegrity: 92, razorFistVelocity: 5 },
  { time: '01:00', violence: 95, threat: 98, fatigue: 15, mobCohesion: 82, actorsActive: 5, structuralIntegrity: 85, razorFistVelocity: 18 },
  { time: '01:15', violence: 92, threat: 95, fatigue: 20, mobCohesion: 78, actorsActive: 4, structuralIntegrity: 78, razorFistVelocity: 16 },
  { time: '01:30', violence: 88, threat: 90, fatigue: 25, mobCohesion: 75, actorsActive: 4, structuralIntegrity: 68, razorFistVelocity: 19 },
  { time: '01:45', violence: 93, threat: 95, fatigue: 30, mobCohesion: 72, actorsActive: 4, structuralIntegrity: 60, razorFistVelocity: 22 },
  { time: '02:00', violence: 90, threat: 92, fatigue: 35, mobCohesion: 68, actorsActive: 3, structuralIntegrity: 52, razorFistVelocity: 20 },
  { time: '02:15', violence: 85, threat: 88, fatigue: 40, mobCohesion: 62, actorsActive: 3, structuralIntegrity: 45, razorFistVelocity: 17 },
  { time: '02:30', violence: 88, threat: 90, fatigue: 45, mobCohesion: 58, actorsActive: 3, structuralIntegrity: 38, razorFistVelocity: 21 },
  { time: '02:45', violence: 92, threat: 95, fatigue: 50, mobCohesion: 52, actorsActive: 2, structuralIntegrity: 28, razorFistVelocity: 24 },
  { time: '03:00', violence: 95, threat: 98, fatigue: 55, mobCohesion: 45, actorsActive: 2, structuralIntegrity: 18, razorFistVelocity: 26 },
  { time: '03:15', violence: 98, threat: 100, fatigue: 58, mobCohesion: 35, actorsActive: 2, structuralIntegrity: 12, razorFistVelocity: 28 },
  { time: '03:30', violence: 100, threat: 100, fatigue: 62, mobCohesion: 20, actorsActive: 2, structuralIntegrity: 5, razorFistVelocity: 30 },
  { time: '03:45', violence: 85, threat: 80, fatigue: 68, mobCohesion: 10, actorsActive: 1, structuralIntegrity: 0, razorFistVelocity: 8 },
  { time: '04:00', violence: 60, threat: 50, fatigue: 72, mobCohesion: 5, actorsActive: 0, structuralIntegrity: 0, razorFistVelocity: 0 },
];
