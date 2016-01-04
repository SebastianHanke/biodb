import {Nt} from './help';

export function calcPositionOnTargetSeq(target, fwd_seq, rev_seq) {

}

export function calcGcCount(sequence) {

    //split returns occurences + 1

    let chars = ['A', 'T', 'C', 'G']
    let counts = []
    for (let char of chars) {
        counts.push(sequence.split(char).length - 1)
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

var __nucleotideLookupTable = Object.create(null),
    __nucleotidesToByte,
    __byteToNucleotides

export class GenerateLookUpTables {
    constructor() {
        __nucleotideLookupTable['A'] = 8; //0b1000
        __nucleotideLookupTable['T'] = 4; //0b0100
        __nucleotideLookupTable['G'] = 2; //0b0010
        __nucleotideLookupTable['C'] = 1; //0b0001

        this.__convertAllNucleotidesToBinary()
        this.__lookupTable()
    }

    __convertAllNucleotidesToBinary() {
        /*
         * generate lookupTable for degenerate nucleotides with AND (&) and OR(|)
         * e.g. W = (A | T) = (1000 | 0100) = 1100
         * to match nucleotides therefor:
         * A & A = (1000 & 1000) = 1000
         * A & W = (1000 & 1100) = 1000
         * A & T = (1000 & 0100) = 0000
         * */

        this.__Nuc2BinLookUp('-');
        this.__Nuc2BinLookUp('W', 'A', 'T');           //W = 0b1100
        this.__Nuc2BinLookUp('S', 'G', 'C');           //S = 0b0011
        this.__Nuc2BinLookUp('K', 'G', 'T');           //K = 0b0110
        this.__Nuc2BinLookUp('R', 'A', 'G');           //R = 0b1010
        this.__Nuc2BinLookUp('Y', 'C', 'T');           //Y = 0b0101
        this.__Nuc2BinLookUp('B', 'C', 'G', 'T');      //B = 0b0111
        this.__Nuc2BinLookUp('D', 'A', 'G', 'T');      //D = 0b1110
        this.__Nuc2BinLookUp('H', 'A', 'C', 'T');      //H = 0b1101
        this.__Nuc2BinLookUp('V', 'A', 'C', 'G');      //V = 0b1011
        this.__Nuc2BinLookUp('N', 'A', 'T', 'G', 'C'); //N = 0b1111
    }

    __Nuc2BinLookUp(...bases) {
        /*
         * Add basic nucleobases to lookUp-table
         * */


        var n = bases[0]
        __nucleotideLookupTable[n] = 0
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
        for (let i = 1; i < bases.length; i++) {
            __nucleotideLookupTable[n] |= __nucleotideLookupTable[bases[i]]
        }
    }

    __matchLookupTable() {
        var a = new Uint8Array(256);
        var bin;
        for (var i = 0; i < 256; i++) {
            bin = i;
            bin = bin - ((bin >> 1) & 0x55555555);
            bin = (bin & 0x33333333) + ((bin >> 2) & 0x33333333);
            a[i] = (((bin + (bin >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
        }
        return a;
    }

    /*
    *
    * generate object for every 1 byte combination e.g. AA, AT, AG, AC, BB, BA, BT, BG, BC etc...
    * and add bitcount e.g. -- = 0, AA = 136, AB = 120
    *
    * */
    __lookupTable() {
        var a = Object.create(null);
        var c = new Array();

        //get degenerated nucleotide chars from __nucleotideLookupTable
        var keys = Object.keys(__nucleotideLookupTable);
        var len = keys.length;
        var ki;
        var kj;
        var byte;
        for (var i = 0; i < len; i++) {
            ki = keys[i];
            for (var j = 0; j < len; j++) {
                kj = keys[j];
                byte = __nucleotideLookupTable[ki] | (__nucleotideLookupTable[kj] << 4);
                a[ki + kj] = byte;
                c[byte] = ki + kj
            }
        }
        __nucleotidesToByte = a
        __byteToNucleotides = c;
    }
}


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

export class SequenceTools extends GenerateLookUpTables {

    constructor(type, sequence, name) {
        // call super constructor
        super()
        this.fnMatchingBitCount = this.__matchLookupTable
        this.__buffer = new ArrayBuffer(4)

        // check type
        if(type === undefined) type == 'DNA'
        if(type.toUpperCase() != 'RNA' && type.toUpperCase() != 'DNA') throw new Error(`Sequence type ${type} not supported`)

        this.__type = type
        this.__name= name
        this.__rawSequence = sequence
        if (sequence) this.readSequence(this.__rawSequence)

        this.__endPadding = 0
        this.__complement = null
        this.__content = null
        this.__contentATGC = null
        this.__fractionalContent = null

    }

    __convertToUInt32Array(sequenceString) {

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
            uint8view[i] = __nucleotideLookupTable[sequenceString[i * 2]] << 4
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
            uint8view[i] |= __nucleotideLookupTable[sequenceString[i * 2 + 1]]
        }
        uint8view.reverse()

        /*
         * return sequenceBuffer that has been modified by uint8view as an array of 32-bit integers
         * */
        /*console.log('uint8: ', uint8view)
         console.log('sequenceBuffer: ', sequenceBuffer)
         console.log('uint32: ', new Uint32Array(sequenceBuffer))*/
        return new Uint32Array(sequenceBuffer)
    }

    countMatches(searchBuffer, queryBuffer) {
        this.searchSeqLength = searchBuffer.length
        this.querySeqLength = queryBuffer.length
        /*
         1000 0100 0010 0001 1000 0100 0010 1100 &
         1000 0100 1000 0100 1100 1100 1111 1111
         =======================================
         1000 0100 0000 0000 1000 0100 0010 1100

         1000 0100 0000 0000 1000 0100 0010 1100 (matches) |
         0100 0010 0000 0000 0100 0010 0001 0110 (matches >>> 1)
         =======================================
         1100 0110 0000 0000 1100 0110 0011 1110

         1100 0110 0000 0000 1100 0110 0011 1110 (matches) |
         0011 0001 1000 0000 0011 0001 1000 1111 (matches >>> 2)
         =======================================
         1111 0111 1000 0000 1111 0111 1011 1111

         1111 0111 1000 0000 1111 0111 1011 1111 (matches) &
         0001 0001 0001 0001 0001 0001 0001 0001
         =======================================
         0001 0001 0000 0000 0001 0001 0001 0001

         0001 0001 0000 0000 0001 0001 0001 0001 (matches) |
         0000 0010 0010 0000 0000 0010 0010 0010 (matches >>> 3)
         =======================================
         0001 0011 0010 0000 0001 0011 0011 0011

         0001 0011 0010 0000 0001 0011 0011 0011 (matches) |
         0000 0000 0100 1100 1000 0000 0100 1100 (matches >>> 6)
         =======================================
         0001 0011 0110 (1100) 1001 0011 0111 (1111)

         First 4 bits:
         0000 0000 0000 0001 0011 0110 1100 1001 (matches >>> 12) &
         0000 0000 0000 0000 0000 0000 1111 0000 (0xF0)
         =======================================
         0000 0000 0000 0000 0000 0000 1100 0000

         Then last 4 bits:
         0001 0011 0110 1100 1001 0011 0111 1111 (matches) &
         0000 0000 0000 0000 0000 0000 0000 1111 (0xF)
         =======================================
         0000 0000 0000 0000 0000 0000 0000 1111

         Finally combine them:
         0000 0000 0000 0000 0000 0000 1100 0000 |
         0000 0000 0000 0000 0000 0000 0000 1111
         =======================================
         0000 0000 0000 0000 0000 0000 1100 1111
         */
        let matchResult = (searchBuffer & queryBuffer)
        matchResult |= matchResult >>> 1
        matchResult |= matchResult >>> 2
        matchResult &= 0x11111111
        matchResult |= matchResult >>> 3
        matchResult |= matchResult >>> 6
        matchResult = ((matchResult >>> 12) & 0xF0) | (matchResult & 0xF)

        return this.fnMatchingBitCount[matchResult]
    }

    /*
    * convert 2 nucleotides (á 4 bits) to 1 byte
    * */
    nucleotidesToByte(ss) {
        return __nucleotidesToByte[ss] | 0
    }

    readSequence(sequenceString) {
        let nucleotideString = sequenceString.toUpperCase()
            //remove whitespace
            .replace(/\s/g, '')
            //replace U (RNA) with T (DNA)
            .replace('U', 'T')
            //replace everything except ATGCBVHDMKRYSWN- with -
            .replace(/[^ATGCBVHDMKRYSWN\-]/g, '-')
        let length = nucleotideString.length | 0

        let max = length >>> 1
        // Sequence has not even nucleotide count
        let odd = length & 1
        // determine needed endPadding to sequence (e.g. ATGCAT.. needs 2 nuc therefore 1 endPadding)
        let endPadding = (4 - (max + odd) % 4) % 4

        let buffer = new ArrayBuffer(max + odd + endPadding + 4)
        let dataArray = new Int8Array(buffer, 4)

        let n

        for (var i = 0; i < max; i++) {
            n = i << 1

            dataArray[i] = this.nucleotidesToByte(nucleotideString[n] + nucleotideString[++n])
        }
        // if odd left shift the last entry in dataArray
        if (odd) dataArray[i] = __nucleotideLookupTable[nucleotideString[i << 1]]

        console.debug('-----------dataArray-------------')
        console.time('start time')
        console.info('dataArray :', dataArray, 'Sequence: ', nucleotideString,'max: ', max, 'buffer: ', buffer)
        console.log(buffer)
        console.timeEnd('end time')
        console.debug('------------------------------------')
        
        this.__buffer = buffer;
        this.__length = length;
        //(new Uint32Array(buffer, 0, 1))[0] = length

        this.__complement = null
        this.__content = null
        this.__fractionalContent = null
        this.__contentATGC = null

        this.sequenceString(this.__buffer)

        return this
    }

    size () {
        return this.__length
    }

    sequenceString () {
        let buffer = this.__buffer
        if (buffer.byteLength < 4) return ''

        let dataArray = new Uint8Array(buffer, 4)
        let length = (buffer.byteLength - 4) - this.__endPadding

        let nucleotidesArray = new Array()

        for (let i = 0; i < length; i++) {
            nucleotidesArray[i] = __byteToNucleotides[dataArray[i]]
        }

        var i = nucleotidesArray.length -1
        // TODO: from here

        console.debug('-----------nucleotidesArray-------------')
        console.time('start time')
        console.info('dataArray :', dataArray)
        console.info('nucleotidesArray :', nucleotidesArray)
        console.timeEnd('end time')
        console.debug('------------------------------------')
    }
}