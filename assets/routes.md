### Router Paths

```bash
(home & layout) -> page

(auth & layout)
|-auth -> page
  |-sign-in -> page
  |-sign-up -> page

(user-profile & layout)
|-[username] -> page
  |-posts -> page
    |-[post] -> page
  |-projects -> page
    |-[project] -> page

(user-card & layout)
|-[username]
  |-card -> page
    |-edit -> page

(add-edit & layout)
|-add
  |-post -> page
  |-project -> page
|-edit
  |-post
    |-[post] -> page
  |-project
    |-[project] -> page
```
