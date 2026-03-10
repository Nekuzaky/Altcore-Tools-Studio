import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type MovementMode = "character-controller" | "rigidbody";

const sanitizeClassName = (value: string) => value.replace(/[^a-zA-Z0-9_]/g, "") || "PlayerController";

const buildCharacterControllerScript = (className: string, withSprint: boolean, withJump: boolean) => `using UnityEngine;

[RequireComponent(typeof(CharacterController))]
public class ${className} : MonoBehaviour
{
    [Header("Movement")]
    [SerializeField] private float walkSpeed = 4.5f;
    ${withSprint ? '[SerializeField] private float sprintSpeed = 7.5f;' : ""}
    [SerializeField] private float gravity = -18f;
    ${withJump ? "[SerializeField] private float jumpHeight = 1.2f;" : ""}

    [Header("Camera")]
    [SerializeField] private Transform cameraPivot;
    [SerializeField] private float mouseSensitivity = 120f;
    [SerializeField] private float minPitch = -75f;
    [SerializeField] private float maxPitch = 80f;

    private CharacterController controller;
    private float verticalVelocity;
    private float pitch;

    private void Awake()
    {
        controller = GetComponent<CharacterController>();
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }

    private void Update()
    {
        HandleLook();
        HandleMove();
    }

    private void HandleLook()
    {
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        pitch -= mouseY;
        pitch = Mathf.Clamp(pitch, minPitch, maxPitch);

        transform.Rotate(Vector3.up * mouseX);
        if (cameraPivot != null)
        {
            cameraPivot.localRotation = Quaternion.Euler(pitch, 0f, 0f);
        }
    }

    private void HandleMove()
    {
        float x = Input.GetAxisRaw("Horizontal");
        float z = Input.GetAxisRaw("Vertical");
        Vector3 move = (transform.right * x + transform.forward * z).normalized;

        float speed = walkSpeed;
        ${withSprint ? 'if (Input.GetKey(KeyCode.LeftShift)) speed = sprintSpeed;' : ""}

        if (controller.isGrounded && verticalVelocity < 0f)
        {
            verticalVelocity = -2f;
        }

        ${withJump ? "if (controller.isGrounded && Input.GetButtonDown(\"Jump\"))\n        {\n            verticalVelocity = Mathf.Sqrt(jumpHeight * -2f * gravity);\n        }" : ""}

        verticalVelocity += gravity * Time.deltaTime;
        Vector3 velocity = move * speed + Vector3.up * verticalVelocity;
        controller.Move(velocity * Time.deltaTime);
    }
}
`;

const buildRigidbodyScript = (className: string, withSprint: boolean) => `using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class ${className} : MonoBehaviour
{
    [Header("Movement")]
    [SerializeField] private float walkSpeed = 4.5f;
    ${withSprint ? '[SerializeField] private float sprintSpeed = 7.5f;' : ""}

    [Header("Camera")]
    [SerializeField] private Transform cameraPivot;
    [SerializeField] private float mouseSensitivity = 120f;
    [SerializeField] private float minPitch = -75f;
    [SerializeField] private float maxPitch = 80f;

    private Rigidbody rb;
    private float pitch;
    private Vector3 inputDirection;

    private void Awake()
    {
        rb = GetComponent<Rigidbody>();
        rb.freezeRotation = true;
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }

    private void Update()
    {
        HandleLook();
        float x = Input.GetAxisRaw("Horizontal");
        float z = Input.GetAxisRaw("Vertical");
        inputDirection = (transform.right * x + transform.forward * z).normalized;
    }

    private void FixedUpdate()
    {
        float speed = walkSpeed;
        ${withSprint ? 'if (Input.GetKey(KeyCode.LeftShift)) speed = sprintSpeed;' : ""}
        Vector3 targetPosition = rb.position + inputDirection * speed * Time.fixedDeltaTime;
        rb.MovePosition(targetPosition);
    }

    private void HandleLook()
    {
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        pitch -= mouseY;
        pitch = Mathf.Clamp(pitch, minPitch, maxPitch);

        transform.Rotate(Vector3.up * mouseX);
        if (cameraPivot != null)
        {
            cameraPivot.localRotation = Quaternion.Euler(pitch, 0f, 0f);
        }
    }
}
`;

export const UnityFpsControllerScriptGeneratorPage = () => {
  const [classNameInput, setClassNameInput] = useState("PlayerController");
  const [movementMode, setMovementMode] = useState<MovementMode>("character-controller");
  const [withSprint, setWithSprint] = useState(true);
  const [withJump, setWithJump] = useState(true);

  const className = useMemo(() => sanitizeClassName(classNameInput), [classNameInput]);

  const script = useMemo(() => {
    if (movementMode === "rigidbody") {
      return buildRigidbodyScript(className, withSprint);
    }
    return buildCharacterControllerScript(className, withSprint, withJump);
  }, [className, movementMode, withSprint, withJump]);

  return (
    <ToolLayout
      seo={{
        title: "Unity FPS Controller Script Generator | Altcore Tools Studio",
        description: "Generate a Unity player controller script with movement and camera look.",
        canonicalPath: "/tools/unity-fps-controller-script-generator"
      }}
      title="Unity FPS Controller Script Generator"
      description="Generate a ready-to-paste C# player controller with movement and mouse look camera."
      category="unity"
      toolSlug="unity-fps-controller-script-generator"
      helpText="Assign Camera Pivot to a child transform that holds the Camera. Input axes use Unity defaults: Horizontal, Vertical, Mouse X, Mouse Y, Jump."
    >
      <Card className="space-y-3">
        <Input value={classNameInput} onChange={(e) => setClassNameInput(e.target.value)} />
        <Select value={movementMode} onChange={(e) => setMovementMode(e.target.value as MovementMode)}>
          <option value="character-controller">CharacterController</option>
          <option value="rigidbody">Rigidbody</option>
        </Select>
        <label className="inline-flex items-center gap-2 text-sm text-text/90">
          <input type="checkbox" checked={withSprint} onChange={(e) => setWithSprint(e.target.checked)} /> Include sprint (Left Shift)
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-text/90">
          <input
            type="checkbox"
            checked={withJump}
            onChange={(e) => setWithJump(e.target.checked)}
            disabled={movementMode === "rigidbody"}
          />{" "}
          Include jump (CharacterController mode)
        </label>
      </Card>
      <Card className="space-y-2">
        <pre className="max-h-[30rem] overflow-auto rounded bg-background p-3 text-xs text-text">{script}</pre>
        <CopyButton value={script} label="Copy FPS controller script" />
      </Card>
    </ToolLayout>
  );
};
