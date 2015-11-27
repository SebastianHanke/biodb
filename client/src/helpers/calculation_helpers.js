export function calcPositionOnTargetSeq (target, fwd_seq, rev_seq) {

}

export function calcGcCount (sequence) {

    //split returns occurences + 1

    let chars = ['A', 'T', 'C', 'G']
    let counts = []
    for (let char of chars) {
        counts.push(sequence.split(char).length -1)
    }
    return counts
}

/*
 *
 * from https://medium.com/@keithwhor/nbeam-how-i-wrote-an-ultra-fast-dna-sequence-alignment-algorithm-in-javascript-c199e936da#.mc7v8kkem
 *
 * and https://github.com/keithwhor/NtSeq
 *
 * */


/*
 *
 * Map all degenerated nucleotides to integers and generate a lookup-table object
 * @param ...bases a Set of bases in the following format: 'W', 'A', 'T'
 *        where W is the degenerate bases that represents A and T Bases
 *
 * */

var _nucleotideLookupTable = Object.create(null);

function setNucleotide(...bases) {
    /*
     * Add basic nucleobases to lookUp-table
     * */
    _nucleotideLookupTable['A'] = 8; //0b1000
    _nucleotideLookupTable['T'] = 4; //0b0100
    _nucleotideLookupTable['G'] = 2; //0b0010
    _nucleotideLookupTable['C'] = 1; //0b0001

    var n = bases[0]
    _nucleotideLookupTable[n] = 0
    /*
     * e.g.: _lookUp['W'] = 0
     *
     * _lookUp['W'] |= _lookUp['A'] => 0000 | 1000 = 1000
     *
     * which results in _lookUp['W'] is now 8 (in bit = 1000)
     * then the next argument/nucleotide will be matched
     *
     * _lookUp['W'] |= _lookUp['T'] => 1000 | 0100 = 1100
     *
     * result is now: _lookUp['W'] = 12 (in bit 1100)
     * */
    for (let i=1; i < bases.length; i++) {
        _nucleotideLookupTable[n] |= _nucleotideLookupTable[bases[i]]
    }
}

/*
 * generate lookupTable for degenerate nucleotides with AND (&) and OR(|)
 * e.g. W = (A | T) = (1000 | 0100) = 1100
 * to match nucleotides therefor:
 * A & A = (1000 & 1000) = 1000
 * A & W = (1000 & 1100) = 1000
 * A & T = (1000 & 0100) = 0000
 * */
setNucleotide('-');
setNucleotide('W', 'A', 'T');           //W = 0b1100
setNucleotide('S', 'G', 'C');           //S = 0b0011
setNucleotide('K', 'G', 'T');           //K = 0b0110
setNucleotide('R', 'A', 'G');           //R = 0b1010
setNucleotide('Y', 'C', 'T');           //Y = 0b0101
setNucleotide('B', 'C', 'G', 'T');      //B = 0b0111
setNucleotide('D', 'A', 'G', 'T');      //D = 0b1110
setNucleotide('H', 'A', 'C', 'T');      //H = 0b1101
setNucleotide('V', 'A', 'C', 'G');      //V = 0b1011
setNucleotide('N', 'A', 'T', 'G', 'C'); //N = 0b1111

/*
 *
 * using 32-bit integer to store nucleotides
 * 4 bits per nucleotide => 2 per byte
 * 4 bytes (32-bits) = 8 nucleotides
 * with:
 * A = 1000
 * T = 0100
 * G = 0010
 * C = 0001
 * e.g. ATGCATGC = 1000 0100 0010 0001 1000 0100 0010 0001
 *
 * */

export function convertSequenceToArrayOfIntegers(sequenceString) {

    // 2 nucleotides = 1 byte (sequenceByte)
    var sequenceBytes = Math.ceil(sequenceString.length / 2)
    /*
     * this defines the length of the ArrayBuffer
     * ArrayBuffer: generic, fixed-length raw binary data buffer
     * */
    var sequenceBuffer = new ArrayBuffer(sequenceBytes);
    /*
     * Uint8Array typed array represents an array of 8-bit unsigned integers
     * e.g. 2 bytes (4 nucleotides) => [0,0], 3 bytes (6 nucleotides) => [0,0,0]
     * */
    var uint8view = new Uint8Array(sequenceBuffer);

    /*
     * convert sequenceString to 8bit patches in Uint8Array:
     * e.g. 'ATGCAT' -> AT GC AT
     * */
    for (let i = 0, len = uint8view.length; i < len; i++) {
        /*
         * get base on all even positions (e.g. A from AT, G from GC, A from AT)
         * and shift the result... A = 1000 << 4 = 1000 0000
         * */
        uint8view[i] = _nucleotideLookupTable[sequenceString[i * 2]] << 4
        /*
         * then get base on all odd positions (e.g. T from AT...)
         * and OR the result to the former result
         * T = 0100 => 1000 0000 |= 0100 = 1000 0100
         * the result in this case is the integer 132, which is stored in uint8view
         *
         * in short:
         * 1000 0000 OR 0100 = 1000 0100
         * 128 OR 4 = 132
         * */
        uint8view[i] |= _nucleotideLookupTable[sequenceString[i * 2 + 1]]
    }

    /*
     * return sequenceBuffer that has been modified by uint8view as an array of 32-bit integers
     * */
    console.log('uint8: ', uint8view)
    console.log('sequenceBuffer: ', sequenceBuffer)
    console.log('uint32: ', new Uint32Array(sequenceBuffer))
    return new Uint32Array(sequenceBuffer)
}