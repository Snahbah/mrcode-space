export interface SimulationConfig {
  seqLength?: number;
  poolSize?: number;
  topK?: number;
}

export interface RoundResult {
  score: number;
  seq: number[];
  roundNum: number;
  archiveSize: number;
}

export class EvolvingLandscape {
  seqLength: number;
  poolSize: number;
  topK: number;
  history: number[][];

  constructor(config: SimulationConfig = {}) {
    this.seqLength = config.seqLength ?? 16;
    this.poolSize  = config.poolSize  ?? 200;
    this.topK      = config.topK      ?? 20;
    this.history   = [];
  }

  baseFitness(seq: number[]): number {
    let score = 0;
    for (let i = 0; i < seq.length - 1; i++) {
      if (seq[i] !== seq[i + 1]) score += 2;
    }
    for (let i = 0; i < Math.floor(seq.length / 2); i++) {
      if (seq[i] === seq[seq.length - 1 - i]) score += 2;
    }
    return score;
  }

  noveltyScore(seq: number[]): number {
    if (this.history.length === 0) return 0;
    const distances = this.history
      .map(past => seq.reduce((acc, v, i) => acc + (v !== past[i] ? 1 : 0), 0))
      .sort((a, b) => a - b);
    const k = Math.min(5, distances.length);
    return distances.slice(0, k).reduce((a, b) => a + b, 0) / k;
  }

  combinedFitness(seq: number[], roundNum: number, noveltyWeight: number): number {
    const base    = this.baseFitness(seq);
    const novelty = this.noveltyScore(seq);
    return base + noveltyWeight * novelty;
  }

  runRound(roundNum: number, noveltyWeight = 1.0): RoundResult {
    const alphabet = [0, 1, 2, 3];
    const pool: Array<{ score: number; seq: number[] }> = [];

    for (let i = 0; i < this.poolSize; i++) {
      const seq = Array.from({ length: this.seqLength }, () =>
        alphabet[Math.floor(Math.random() * alphabet.length)]
      );
      const score = this.combinedFitness(seq, roundNum, noveltyWeight);
      pool.push({ score, seq });
    }

    pool.sort((a, b) => b.score - a.score);
    const winners = pool.slice(0, this.topK);
    this.history.push(...winners.map(w => w.seq));

    return {
      score:       winners[0].score,
      seq:         winners[0].seq,
      roundNum,
      archiveSize: this.history.length,
    };
  }

  reset(): void {
    this.history = [];
  }
}
