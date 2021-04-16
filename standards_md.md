# Markdown standards

You will find here a couple of standards to help you provide a good quality git.


## Police

#### Sections

Each md file should have a title (# Title), section (## SectionName) and sub-section (#### SubSectionName)

*Example:*
```
# Title

## Section 1

#### Sub-section 1
```

#### Text emphasis

You can use bold and italic to highlight main information in your explanations.

*Example:*

'A Pod is the *unit of deployment* in ***Kubernetes***, which represents a **single instance of the application**'

#### Code snippets

It is important to add code examples and illustrations. For doing so, you have two options depending if it's single or multi lines commands.

*Example:*

- multilines:
```
apiVersion: v1
kind: Pod
spec:
 containers:
 - image: nginx:1.14.2
```
- single line:
> kubectl create -f first_pod.Yaml

#### Exercise / Hands-on

In order to let the different md quite readible and not encourage people to watch directly answers. We would like you to enunciate them with the 'details' element.

*Example:*

- Hands-on:


Put your hands-on objectives and what it covers.

<details>
    <summary>
    Click to access detailed hands on session on pod vs container lifecycle
    </summary>


    Let's use some examples
    #### part 1 - hands on

    ...

</details>


- Exercise

Give your problem's wording and then put some hints in the following expandable section


<details>
   <summary>
   Hints
   </summary>

   - Some explanations on what they should think of

   - > Put a useful command here that they should adapt for your exercise.

</details>


#### Pictures/Schemas

Schemas and pictures will help clarify your explanations. Here how to access them on your md.

![](bd_pics.jpg)
