#!/usr/bin/env bash
set -e
set -u
set -o pipefail

pdflatex report.tex
pdflatex report.tex
bibtex report.aux
pdflatex report.tex
pdflatex report.tex
