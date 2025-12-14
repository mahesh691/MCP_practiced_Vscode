import * as fs from 'fs';
import * as path from 'path';

/**
 * Utility module for Axe accessibility testing
 */

export interface AxeViolation {
  id: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  description: string;
  nodes: Array<{ html: string; target: string[] }>;
}

export interface AxePass {
  id: string;
  description: string;
  nodes: Array<{ html: string; target: string[] }>;
}

export interface AxeResults {
  violations: AxeViolation[];
  passes: AxePass[];
  inapplicable: Array<{ id: string; description: string }>;
  incomplete: Array<{ id: string; description: string }>;
}

/**
 * Export Axe results to JSON file
 */
export function exportAxeResultsToJSON(results: AxeResults, testName: string, outputDir: string = 'axe-results'): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsDir = path.join(process.cwd(), outputDir);

  // Create results directory if it doesn't exist
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const fileName = `${testName}-${timestamp}.json`;
  const filePath = path.join(resultsDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
  console.log(`✓ Axe results exported to: ${filePath}`);

  return filePath;
}

/**
 * Generate Axe summary report
 */
export function generateAxeSummary(results: AxeResults): {
  violations: number;
  passes: number;
  inapplicable: number;
  incomplete: number;
  criticalViolations: number;
  seriousViolations: number;
} {
  const violations = results.violations || [];
  const passes = results.passes || [];
  const inapplicable = results.inapplicable || [];
  const incomplete = results.incomplete || [];

  const criticalViolations = violations.filter((v) => v.impact === 'critical').length;
  const seriousViolations = violations.filter((v) => v.impact === 'serious').length;

  return {
    violations: violations.length,
    passes: passes.length,
    inapplicable: inapplicable.length,
    incomplete: incomplete.length,
    criticalViolations,
    seriousViolations
  };
}

/**
 * Filter violations by impact level
 */
export function filterViolationsByImpact(
  violations: AxeViolation[],
  impact: 'critical' | 'serious' | 'moderate' | 'minor'
): AxeViolation[] {
  return violations.filter((v) => v.impact === impact);
}

/**
 * Filter violations by rule ID
 */
export function filterViolationsById(violations: AxeViolation[], ruleIds: string[]): AxeViolation[] {
  return violations.filter((v) => ruleIds.includes(v.id));
}

/**
 * Ignore specific violations (known false positives)
 */
export function ignoreViolations(
  violations: AxeViolation[],
  ignoreRules: { id: string; selectors?: string[] }[]
): AxeViolation[] {
  return violations.filter((violation) => {
    const ignoreRule = ignoreRules.find((rule) => rule.id === violation.id);

    if (!ignoreRule) {
      return true; // Keep if not in ignore list
    }

    // If specific selectors are provided, only ignore matching nodes
    if (ignoreRule.selectors && ignoreRule.selectors.length > 0) {
      violation.nodes = violation.nodes.filter((node) => {
        return !ignoreRule.selectors!.some((selector) =>
          node.target.some((t) => t.includes(selector))
        );
      });
      return violation.nodes.length > 0; // Keep violation if nodes remain
    }

    return false; // Ignore entire rule
  });
}

/**
 * Generate detailed violations report
 */
export function generateDetailedReport(results: AxeResults): string {
  const violations = results.violations || [];
  const passes = results.passes || [];

  let report = `
================================================================================
AXIAL ACCESSIBILITY REPORT
================================================================================

SUMMARY
-------
Total Violations: ${violations.length}
Total Passes: ${passes.length}
Inapplicable Rules: ${(results.inapplicable || []).length}
Incomplete Rules: ${(results.incomplete || []).length}

VIOLATIONS BY IMPACT
--------------------
Critical: ${violations.filter((v) => v.impact === 'critical').length}
Serious: ${violations.filter((v) => v.impact === 'serious').length}
Moderate: ${violations.filter((v) => v.impact === 'moderate').length}
Minor: ${violations.filter((v) => v.impact === 'minor').length}

DETAILED VIOLATIONS
-------------------
`;

  violations.forEach((violation, index) => {
    report += `\n${index + 1}. [${violation.impact.toUpperCase()}] ${violation.id}\n`;
    report += `   Description: ${violation.description}\n`;
    report += `   Affected Nodes: ${violation.nodes.length}\n`;
    violation.nodes.slice(0, 3).forEach((node) => {
      report += `   - ${node.target.join(' > ')}\n`;
    });
    if (violation.nodes.length > 3) {
      report += `   ... and ${violation.nodes.length - 3} more\n`;
    }
  });

  report += `
================================================================================
`;

  return report;
}

/**
 * Export detailed report to text file
 */
export function exportDetailedReport(results: AxeResults, testName: string, outputDir: string = 'axe-results'): string {
  const report = generateDetailedReport(results);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsDir = path.join(process.cwd(), outputDir);

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const fileName = `${testName}-report-${timestamp}.txt`;
  const filePath = path.join(resultsDir, fileName);

  fs.writeFileSync(filePath, report);
  console.log(`✓ Detailed report exported to: ${filePath}`);

  return filePath;
}
