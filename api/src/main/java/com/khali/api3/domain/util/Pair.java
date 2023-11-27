package com.khali.api3.domain.util;

import lombok.ToString;

@ToString
public class Pair<T> {
    public final T x;
    public final T y;
    public Pair(T x, T y) {
        this.x = x;
        this.y = y;
    }
}
