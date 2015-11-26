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