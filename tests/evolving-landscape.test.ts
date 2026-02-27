import { describe, it, expect } from 'vitest';
import { EvolvingLandscape } from '../src/lib/evolving-landscape';

describe('EvolvingLandscape', () => {
  describe('baseFitness', () => {
    it('rewards alternating patterns', () => {
      const sim = new EvolvingLandscape();
      const score = sim.baseFitness([0, 1, 0, 1]);
      expect(score).toBeGreaterThan(sim.baseFitness([0, 0, 0, 0]));
    });

    it('rewards symmetry', () => {
      const sim = new EvolvingLandscape();
      const symmetric = sim.baseFitness([0, 1, 1, 0]);
      const asymmetric = sim.baseFitness([0, 1, 2, 3]);
      expect(symmetric).toBeGreaterThan(asymmetric);
    });

    it('returns 0 for single-element sequence', () => {
      const sim = new EvolvingLandscape();
      expect(sim.baseFitness([0])).toBe(0);
    });
  });

  describe('noveltyScore', () => {
    it('returns 0 with empty history', () => {
      const sim = new EvolvingLandscape();
      expect(sim.noveltyScore([0, 1, 2, 3])).toBe(0);
    });

    it('returns higher score for more distant sequences', () => {
      const sim = new EvolvingLandscape();
      sim.history = [[0, 0, 0, 0]];
      const close = sim.noveltyScore([0, 0, 0, 1]);
      const far   = sim.noveltyScore([1, 1, 1, 1]);
      expect(far).toBeGreaterThan(close);
    });
  });

  describe('runRound', () => {
    it('returns a result with score and sequence', () => {
      const sim = new EvolvingLandscape({ seqLength: 8, poolSize: 20, topK: 5 });
      const result = sim.runRound(0);
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('seq');
      expect(result.seq).toHaveLength(8);
    });

    it('adds winners to history', () => {
      const sim = new EvolvingLandscape({ seqLength: 8, poolSize: 20, topK: 5 });
      expect(sim.history).toHaveLength(0);
      sim.runRound(0);
      expect(sim.history).toHaveLength(5);
    });

    it('archive grows across rounds', () => {
      const sim = new EvolvingLandscape({ seqLength: 8, poolSize: 20, topK: 5 });
      sim.runRound(0);
      sim.runRound(1);
      expect(sim.history).toHaveLength(10);
    });
  });
});
