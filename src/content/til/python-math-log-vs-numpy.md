---
title: "Python's math.log is faster than numpy.log for scalars"
date: 2026-05-20
tags: [swe]
---

When computing a single log value (not a vector), `math.log` is significantly faster than `numpy.log` because numpy has overhead for array broadcasting even on scalars.

```python
import math, numpy as np, timeit

timeit.timeit(lambda: math.log(1234.5), number=1_000_000)   # ~0.08s
timeit.timeit(lambda: np.log(1234.5),   number=1_000_000)   # ~0.38s
```

In our loss model we had numpy scattered throughout single-value actuarial calculations. Swapping to `math` for scalar paths shaved meaningful time off tight loops.

**Rule of thumb**: use `numpy` when operating on arrays, `math` for scalars.
